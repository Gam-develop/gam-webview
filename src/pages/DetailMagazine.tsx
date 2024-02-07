import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Magazine from '../components/Magazine';
import styled from 'styled-components';
import MagazineAdminHeader from '../components/MagazineAdminHeader';
import AdminContentLayout from '../components/AdminContentLayout';
import { Link } from 'react-router-dom';

const DetailMagazine = ({ useRecoilData }: { useRecoilData: boolean }) => {
  return (
    <St.PageLayoutWrapper>
      <PageLayout>
        <MagazineAdminHeader />
        <AdminContentLayout isPreviewOpen={true}>
          <Magazine useRecoilData={useRecoilData} />
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
  MagazineCreateButton: styled(Link)`
    margin-top: 15.2rem;
    margin-bottom: 16rem;
    background-color: ${({ theme }) => theme.colors.Gam_Black};
    height: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  `,
};
