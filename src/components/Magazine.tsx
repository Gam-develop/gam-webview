import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import { magazineDetailState, magazineResultState } from '../recoil/atom';
import ErrorPage from '../pages/ErrorPage';
import MagazineImage from './MagazineImage';
import MagazineQuestion from './MagazineQuestion';
import { magazineDetail } from '../types/magazine';

const Magazine = () => {
  const { magazineId } = useParams();

  if (!magazineId) {
    return <ErrorPage />;
  }

  // const { magazineResult, isLoading, isError } = useGetMagazineDetail(magazineId);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  // useEffect(() => {
  //   if (magazineResult) {
  //     setMagazineDetail(magazineResult.data);
  //   }
  // }, [magazineResult]);

  // if (isLoading) return <div>Loading</div>;
  // if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <MagazineImage magazinePhotos={magazineDetail.magazinePhotos}></MagazineImage>
      <St.MagazineQAWrapper>
        <St.MagazineIntro>{magazineDetail.magazineIntro}</St.MagazineIntro>
        <MagazineQuestion magazineQuestions={magazineDetail.questions}></MagazineQuestion>
      </St.MagazineQAWrapper>
    </St.MagazineWrapper>
  );
};

export default Magazine;

const St = {
  MagazineWrapper: styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    max-width: 39.5rem;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.Gam_White};
    margin: auto;
    margin-bottom: 16rem;
  `,

  MagazineQAWrapper: styled.section`
    /* padding: 0rem 2rem; */
  `,

  MagazineIntro: styled.div`
    padding: 0 2rem;
    margin: 6rem 0rem 5.5rem 0rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};
  `,
};
