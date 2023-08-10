import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMagazine from './pages/DetailMagazine';
import CreateMagazine from './pages/CreateMagazine';
import MainList from './pages/MainList';
import { RecoilRoot } from 'recoil';

const Router = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/magazine/list" element={<MainList />} />
          <Route path="/magazine/create" element={<CreateMagazine />} />
          <Route path="/magazine/:magazineId" element={<DetailMagazine />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
