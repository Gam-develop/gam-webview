import axios from 'axios';
import AppConfig from '../common/constants';
import { getAccessToken, getRefreshToken, setUserSession } from './token';
import { TokenDto } from './api/dto/login.dto';
import { adminRefreshToken } from './api/login';

const client = axios.create({
  baseURL: AppConfig.API_SERVER,
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.request.use((config: any) => {
  const token = getAccessToken('accessToken');
  const headers = {
    ...config.headers,
    Authorization: token,
  };
  return { ...config, headers };
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (error.response.data.message === '유효하지 않은 토큰입니다.') {
        try {
          const accessToken = getAccessToken('accessToken');
          const refreshToken = getRefreshToken('refreshToken');

          // refresh 요청
          const param = new TokenDto();
          param.accessToken = accessToken;
          param.refreshToken = refreshToken;
          const res = await adminRefreshToken(param);
          console.log(res);
          // 재발급 받은 토큰 저장
          setUserSession(res.accessToken, res.refreshToken);

          // 헤더의 Authoriaztion에 재발급 받은 accessToken 저장
          originalRequest.headers['Authorization'] = res.accessToken;
          return client(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const gamGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
