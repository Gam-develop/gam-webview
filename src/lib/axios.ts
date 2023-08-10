import axios from 'axios';
//import { getAccessToken, setAccessToken } from './token';

const client = axios.create({
  baseURL: '',
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.request.use((config: any) => {
  const headers = {
    ...config.headers,
    // Authorization: `${getAccessToken('accessToken')}`,
    Authorization: '',
    //  accessToken: getAccessToken('accessToken'),
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
