import React from 'react';
import styled from 'styled-components';

const AdminContentLayout = (props: any) => {
  const { children } = props;
  return <St.MagazineCreateWrapper>{children}</St.MagazineCreateWrapper>;
};

export default AdminContentLayout;

const St = {
  MagazineCreateWrapper: styled.section`
    max-width: 120rem;
    width: 100%;
    margin-top: 120px;
  `,
};
