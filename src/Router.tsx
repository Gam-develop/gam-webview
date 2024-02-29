import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMagazine from './pages/DetailMagazine';
import CreateMagazine from './pages/CreateMagazine';
import MainList from './pages/MainList';
import { RecoilRoot } from 'recoil';
import CreateMagazineDemo from './pages/CreateMagazine';
import Magazine from './components/Magazine';
import Login from './pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainList />} />
          <Route path="/magazine/create" element={<CreateMagazine />} />
          <Route path="/magazine/create/:magazineId" element={<CreateMagazine />} />
          <Route path="/magazine/:magazineId" element={<DetailMagazine />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
