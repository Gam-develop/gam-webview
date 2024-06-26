import { client } from '../axios';
import { clearUserSession, setUserSession } from '../token';
import { LoginDto, TokenDto } from './dto/login.dto';

export const adminLogin = async (param: LoginDto) => {
  try {
    const { data } = await client.post('/api/v1/social/login', param);
    if (data.data) {
      setUserSession(data.data.accessToken, data.data.refreshToken);
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const adminLogout = async (param: TokenDto) => {
  try {
    const { data } = await client.post('/api/v1/social/logout', param);
    if (data.success) {
      clearUserSession();
      window.alert('로그아웃 되었습니다.');
    }
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const adminRefreshToken = async (param: TokenDto) => {
  try {
    const { data } = await client.post('/api/v1/social/refresh', param);
    if (data.success) return data.data;
  } catch (e) {
    console.error(e);
  }
};
