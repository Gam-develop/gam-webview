import React, { useState } from 'react';
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

const Magazine = (props: any) => {
  const { magazineId } = useParams();

  const { useRecoilData } = props;
  // if (!magazineId) {
  //   return <ErrorPage />;
  // }

  const { magazineDetailResult, isLoading, isError } = useGetMagazineDetail(magazineId as string);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  const [magazine, setMagazine] = useState(magazineDetail);

  useEffect(() => {
    if (magazineDetailResult && !useRecoilData) {
      setMagazine({
        magazineIntro: magazineDetailResult.magazineIntro,
        magazinePhotos: magazineDetailResult.magazinePhotos,
        questions: magazineDetailResult.questions,
      });
    } else if (useRecoilData) {
      setMagazine(magazineDetail);
    }
  }, [magazineDetailResult, useRecoilData]);

  useEffect(() => {}, [magazineDetail, useRecoilData]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <MagazineImage magazinePhotos={magazine.magazinePhotos}></MagazineImage>
      <St.MagazineQAWrapper>
        <St.MagazineIntro>{magazine.magazineIntro}</St.MagazineIntro>
        <MagazineQuestion magazineQuestions={magazine.questions}></MagazineQuestion>
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
    max-width: 43rem;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.Gam_LigthGray};
    margin: auto;
    margin-bottom: 16rem;
    @media only screen and (max-width: 430px) {
      margin-bottom: 0;
    }
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
