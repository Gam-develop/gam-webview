import axios from 'axios';
import AppConfig from '../common/constants';
import { getAccessToken, getRefreshToken } from './token';
import { TokenDto } from './api/dto/login.dto';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { magazineTokenState } from '../recoil/atom';
import { adminRefreshToken } from './api/login';
//import { getAccessToken, setAccessToken } from './token';

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
    // Authorization: `${getAccessToken('accessToken')}`,
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
          console.log(accessToken, refreshToken);

          // refresh 요청
          const param = new TokenDto();
          param.accessToken = accessToken;
          param.refreshToken = refreshToken;
          const res = await adminRefreshToken(param);
          console.log(res);

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
