import type { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { gamGetFetcher } from '../axios';
import { magazineListData } from '../../types/magazine';
import { useEffect } from 'react';
import { clearUserSession } from '../token';
import { useNavigate } from 'react-router-dom';
import { ResponseDto } from '../api/dto/response.dto';

const useGetMagazineList = () => {
  const navigate = useNavigate();
  const { data, error } = useSWR<ResponseDto<magazineListData[]>>(`/api/v1/admin/magazine/list`, gamGetFetcher, {
    errorRetryCount: 3,
  });

  /**
   * 관리자 권한이 없으면 alert창 띄우고 로그인 화면으로 돌아감
   */
  useEffect(() => {
    if (data?.message === '관리자 권한이 없습니다.') {
      window.alert(data.message);
      clearUserSession();
      navigate('/');
    }
  }, [data, error]);

  return {
    magazineListResult: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetMagazineList;
