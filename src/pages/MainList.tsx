import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MagazineList from '../components/MagainzeList';
import MagazineAdminHeader from '../components/MagazineAdminHeader';

const MainList = () => {
  return (
    <PageLayout>
      <MagazineAdminHeader />
      <MagazineList />
      <Outlet />
    </PageLayout>
  );
};

export default MainList;
