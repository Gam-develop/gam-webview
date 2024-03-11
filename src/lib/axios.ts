import axios from 'axios';
import AppConfig from '../common/constants';
import { getAccessToken } from './token';
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
    return error.response;
  },
);

export const gamGetFetcher = (url: string) => client.get(url).then((res) => res.data);

export { client };
