import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../lib/token';
import { useEffect, useRef, useState } from 'react';

const PublicRoutePage = () => {
  const [token, setToken] = useState<string | null>(getAccessToken('accessToken'));

  // 초기 렌더링인지 판별
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (token) {
      window.alert('잘못된 접근입니다. 로그아웃 후 시도해주세요.');
    }
  }, [token]);

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutePage;
