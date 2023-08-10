import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { gamGetFetcher } from '../axios';
import { magazineDetail } from '../../types/magazine';

const useGetMagazineDetail = (magazineId: string) => {
  const { data, error } = useSWR<AxiosResponse<magazineDetail>>(`/api/v1/magazine/detail?magazineId=${+magazineId}`, gamGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    magazineResult: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetMagazineDetail;
