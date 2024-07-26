import { useRecoilValue, useResetRecoilState } from 'recoil';
import { TokenDto } from '../lib/api/dto/login.dto';
import { useNavigate } from 'react-router-dom';
import { magazineTokenState } from '../recoil/atom';
import { adminLogout } from '../lib/api/login';
import { styled } from 'styled-components';
import { getAccessToken, getRefreshToken } from '../lib/token';

const Logout = () => {
  const resetToken = useResetRecoilState(magazineTokenState);
  const params = new TokenDto();
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    params.accessToken = getAccessToken('accessToken');
    params.refreshToken = getRefreshToken('refreshToken');
    await adminLogout(params);
    resetToken();
    navigate('/');
  };

  return <StLogOut onClick={handleClickLogout}>로그아웃</StLogOut>;
};

export default Logout;

const StLogOut = styled.button`
  position: absolute;
  width: 12.2rem;
  height: 100%;
  padding: 1.2rem 1.6rem;
  right: 7.6rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gam_Header};
  /* text-decoration: none; */
  color: ${({ theme }) => theme.colors.Gam_White};
  ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_26};
`;
