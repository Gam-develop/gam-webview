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

export const deleteMagazine = async (magazineId: number) => {
  try {
    const { data } = await client.delete(`/api/v1/admin/magazine/${magazineId}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};
