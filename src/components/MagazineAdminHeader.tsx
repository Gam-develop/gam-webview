import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../lib/api/login';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { magazineTokenState } from '../recoil/atom';
import { LogoutDto } from '../lib/api/dto/login.dto';

const MagazineAdminHeader = (props: any) => {
  const { isMainList } = props;
  const resetToken = useResetRecoilState(magazineTokenState);
  const token = useRecoilValue(magazineTokenState);
  const params = new LogoutDto();
  const navigate = useNavigate();
  const handleClickLogout = async () => {
    params.accessToken = token.accessToken;
    params.refreshToken = token.refreshToken;
    await adminLogout(params);
    resetToken();
    navigate('/');
  };

  return (
    <StHeaderWrapper>
      <IcGam />
      {isMainList && <StLogOut onClick={handleClickLogout}>로그아웃</StLogOut>}
    </StHeaderWrapper>
  );
};

export default MagazineAdminHeader;

const StHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Gam_Header};

  width: 100%;
  height: 12rem;

  @media only screen and (max-width: 430px) {
    display: none;
  }
`;

const StLogOut = styled.button`
  position: absolute;
  width: 12.2rem;
  padding: 1.2rem 1.6rem;
  right: 7.6rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gam_Header};
  /* text-decoration: none; */
  color: ${({ theme }) => theme.colors.Gam_White};
  ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_26};
`;
