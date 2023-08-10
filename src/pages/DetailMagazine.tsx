import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Magazine from '../components/Magazine';

const DetailMagazine = () => {
  return (
    <PageLayout>
      <Magazine />
      <Outlet />
    </PageLayout>
  );
};

export default DetailMagazine;
