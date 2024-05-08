import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMagazine from './pages/DetailMagazine';
import CreateMagazine from './pages/CreateMagazine';
import MainList from './pages/MainList';
import { RecoilRoot } from 'recoil';
import Login from './pages/Login';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';

const Router = () => {
  // TODO 추후 android도 추가 예정
  // ios기기, PC 접속 구분
  const userAgent = navigator.userAgent;
  const isAppAccess = userAgent.toLowerCase().includes('iphone');

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          {isAppAccess ? (
            <Route path="/magazine/:magazineId" element={<DetailMagazine />} />
          ) : (
            <>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Login />} />
                <Route path="/kakao/callback" element={<Login />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/magazine/list" element={<MainList />} />
                <Route path="/magazine/create" element={<CreateMagazine />} />
                <Route path="/magazine/create/:magazineId" element={<CreateMagazine />} />
                {/* <Route path="/magazine/:magazineId" element={<DetailMagazine />} /> */}
              </Route>
            </>
          )}
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
