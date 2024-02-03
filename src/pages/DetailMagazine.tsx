import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Magazine from '../components/Magazine';

const DetailMagazine = ({ useRecoilData }: { useRecoilData: boolean }) => {
  return (
    <PageLayout>
      <Magazine useRecoilData={useRecoilData} />
      <Outlet />
    </PageLayout>
  );
};

export default DetailMagazine;
