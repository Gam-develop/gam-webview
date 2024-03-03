import { client } from '../axios';
import { setUserSession } from '../token';
import { LoginDto } from './dto/login.dto';

export const adminLogin = async (param: LoginDto) => {
  try {
    const { data } = await client.post('/api/v1/social/login', param);
    if (data.data) {
      setUserSession(data.data.accessToken);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
