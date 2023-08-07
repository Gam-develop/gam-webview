import axios from 'axios';

import { getAccessToken, setAccessToken } from './token';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    'Content-type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    // Authorization: `${getAccessToken('accessToken')}`,
    Authorization: import.meta.env.VITE_TEMP_TOKEN,
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

export const gamGetFetcher = (url) => client.get(url).then((res) => res.data);

export { client };
