import axios from 'axios';
import { client } from '../axios';
import { magazineDetail, magazineDetailResult } from '../../types/magazine';

export const createMagazine = async (magazine: any) => {
  console.log(magazine);
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

export const updateMagazine = async (magazine: any, magazineId: string | undefined) => {
  try {
    if (magazineId) {
      console.log(magazine);
      const { data } = await client.patch(`/api/v1/admin/magazine/${+magazineId}`, magazine);
      console.log(data);
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};
