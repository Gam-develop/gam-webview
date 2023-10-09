import axios from 'axios';
import { client } from '../axios';

export const createMagazine = async (magazine: any) => {
  try {
    const { data } = await client.post('/api/v1/admin/magazine', magazine);
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
