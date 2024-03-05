import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMagazine from './pages/DetailMagazine';
import CreateMagazine from './pages/CreateMagazine';
import MainList from './pages/MainList';
import { RecoilRoot } from 'recoil';
import Login from './pages/Login';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/">
              <Route path="/" element={<Login />} />
              <Route path="/kakao/callback" element={<Login />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/magazine/list" element={<MainList />} />
            <Route path="/magazine/create" element={<CreateMagazine />} />
            <Route path="/magazine/create/:magazineId" element={<CreateMagazine />} />
            <Route path="/magazine/:magazineId" element={<DetailMagazine />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
