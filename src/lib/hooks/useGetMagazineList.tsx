import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { gamGetFetcher } from '../axios';
import { magazineListData } from '../../types/magazine';

const useGetMagazineList = () => {
  const { data, error } = useSWR<AxiosResponse<magazineListData[]>>(`/api/v1/admin/magazine/list`, gamGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    magazineListResult: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetMagazineList;
