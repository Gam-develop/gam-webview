import React from 'react';
import styled from 'styled-components';

const AdminContentLayout = (props: any) => {
  const { children } = props;
  return (
    <>
      <St.MagazineCreateWrapper>
        <h1>매거진 작성</h1>
        {children}
      </St.MagazineCreateWrapper>
    </>
  );
};

export default AdminContentLayout;

const St = {
  MagazineCreateWrapper: styled.section`
    max-width: 120rem;
    width: 100%;
    margin-top: 120px;
    h1 {
      ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_24};
      color: ${({ theme }) => theme.colors.Gam_Black};
    }
  `,
};
