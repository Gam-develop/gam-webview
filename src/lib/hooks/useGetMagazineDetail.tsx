import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { gamGetFetcher } from '../axios';
import { magazineDetail } from '../../types/magazine';

const useGetMagazineDetail = (magazineId: string) => {
  console.log(magazineId);
  // magazineId가 없을때 체크
  if (!magazineId) {
    return {
      magazineData: null,
      isLoading: false,
      isError: false,
    };
  }
  const { data, error } = useSWR<AxiosResponse<magazineDetail>>(`/api/v1/admin/magazine/detail?magazineId=${+magazineId}`, gamGetFetcher, {
    errorRetryCount: 3,
    shouldRetryOnError: false,
  });

  return {
    magazineData: data?.data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetMagazineDetail;
