import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { gamGetFetcher } from '../axios';
import { magazineDetail } from '../../types/magazine';

const useGetMagazineWebView = (magazineId: string) => {
  // magazineId가 없을때 체크
  if (!magazineId) {
    return {
      magazineData: null,
      isLoading: false,
      isError: false,
    };
  }
  const { data, error } = useSWR<AxiosResponse<magazineDetail>>(`/api/v1/magazine/detail?magazineId=${+magazineId}`, gamGetFetcher, {
    errorRetryCount: 3,
    shouldRetryOnError: false,
  });

  // if(data?.data.message === "포트폴리오를 추가하지 않은 유저입니다."){

  // }

  return {
    magazineData: data?.data,
    loading: !data && !error,
    error: error,
  };
};

export default useGetMagazineWebView;
