import axios from 'axios';
import AppConfig from '../common/constants';
import { getAccessToken } from './token';
import { TokenDto } from './api/dto/login.dto';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { magazineTokenState } from '../recoil/atom';
import { refreshToken } from './api/login';
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
    console.log(originalRequest._retry);
    if (error.response.status === 401) {
      originalRequest._retry = true;
      try {
        // token recoil
        const tokenValue = useRecoilValue(magazineTokenState);
        const setMagazineToken = useSetRecoilState(magazineTokenState);

        // refresh 요청
        const param = new TokenDto();
        param.accessToken = tokenValue.accessToken;
        param.refreshToken = tokenValue.refreshToken;
        const res = await refreshToken(param);
        console.log(res);

        // 새로 갱신된 토큰으로 세팅
        const tokenParams = {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        };
        setMagazineToken(tokenParams);
        originalRequest.headers['Authorization'] = res.accessToken;
        return client(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export const gamGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
