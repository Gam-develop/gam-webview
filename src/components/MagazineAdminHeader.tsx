import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IcGam } from '../assets/icon/IcGam.svg';

const MagazineAdminHeader = () => {
  return (
    <StHeaderWrapper>
      <IcGam />
    </StHeaderWrapper>
  );
};

export default MagazineAdminHeader;

const StHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.Gam_Header};

  padding: 20px 0px;

  width: 100%;
  height: 120px;
`;
