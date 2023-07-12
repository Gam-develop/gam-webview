import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMagazine from './pages/DetailMagazine';
import CreateMagazine from './pages/CreateMagazine';
import { RecoilRoot } from 'recoil';

const Router = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<CreateMagazine />} />
          <Route path="/magazine/:magazineId" element={<DetailMagazine />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
