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
            <Route path="/auth">
              <Route path="/auth" element={<Login />} />
              <Route path="/auth/kakao/callback" element={<Login />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainList />} />
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
