import { useNavigate } from 'react-router-dom';
import { client } from '../axios';
import { setAccessToken } from '../token';
import { LoginDto } from './dto/login.dto';

export const adminLogin = async (param: LoginDto) => {
  try {
    const { data } = await client.post('/api/v1/social/login', param);
    if (data.data) {
      console.log(data);
      setAccessToken('accessToken', data.data.accessToken);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
