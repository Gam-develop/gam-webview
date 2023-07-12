import useSWR from 'swr';
import { gamGetFetcher } from '../axios';

const useGetMagazineDetail = (magazineId) => {
  const { data, error } = useSWR(`/api/v1/magazine/detail?magazineId=${magazineId}`, gamGetFetcher, {
    errorRetryCount: 10,
  });

  return {
    magazineResult: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export default useGetMagazineDetail;
