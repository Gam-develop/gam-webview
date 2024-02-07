import axios from 'axios';
import { client } from '../axios';

export const getPresignedUrl = async (fileName: string) => {
  try {
    const { data } = await client.get(`/api/v1/s3/image?fileName=${fileName}`);
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const putPresignedUrl = async (file: File, signedUrl: string) => {
  await axios.request({
    method: 'PUT',
    baseURL: decodeURIComponent(signedUrl),
    headers: { 'Content-Type': file.type },
    data: file,
  });
};
