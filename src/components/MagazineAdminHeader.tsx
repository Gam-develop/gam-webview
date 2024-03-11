import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';
import { Link } from 'react-router-dom';
import { clearUserSession } from '../lib/token';

const MagazineAdminHeader = (props: any) => {
  const { isMainList } = props;
  const handleClickLogout = () => {
    clearUserSession();
    window.alert('로그아웃 되었습니다.');
  };
  return (
    <StHeaderWrapper>
      <IcGam />
      {isMainList && (
        <StLogOut to="/auth" onClick={handleClickLogout}>
          로그아웃
        </StLogOut>
      )}
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

const StLogOut = styled(Link)`
  position: absolute;
  width: 12.2rem;
  padding: 1.2rem 1.6rem;
  right: 7.6rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.Gam_White};
  ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_26};
`;
