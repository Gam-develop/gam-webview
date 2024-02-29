import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Magazine from '../components/Magazine';
import styled from 'styled-components';
import MagazineAdminHeader from '../components/MagazineAdminHeader';
import AdminContentLayout from '../components/AdminContentLayout';
import { Link } from 'react-router-dom';

const DetailMagazine = () => {
  return (
    <St.PageLayoutWrapper>
      <PageLayout>
        <MagazineAdminHeader />
        <AdminContentLayout isPreviewOpen={true}>
          <Magazine useRecoilData={false} />
          <Outlet />
        </AdminContentLayout>
      </PageLayout>
    </St.PageLayoutWrapper>
  );
};

export default DetailMagazine;

const St = {
  PageLayoutWrapper: styled.div`
    background-color: ${({ theme }) => theme.colors.Gam_Gray};
  `,
};
