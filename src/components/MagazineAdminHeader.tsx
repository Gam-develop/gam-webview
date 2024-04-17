import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';
import Logout from '../pages/Logout';

const MagazineAdminHeader = (props: any) => {
  const { isMainList } = props;

  return (
    <StHeaderWrapper>
      <IcGam />
      {isMainList && <Logout />}
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
