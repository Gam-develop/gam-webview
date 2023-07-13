import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import theme from '../styles/theme';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGetMagazineDetail from '../lib/hooks/useGetMagazineDetail';
import { magazineDetailState } from '../recoil/atom';
import ErrorPage from '../pages/ErrorPage';
import { useCollapse } from 'react-collapsed';
import { ReactComponent as IcCollapse } from '../assets/icon/IcCollapse.svg';
import { ReactComponent as IcExpand } from '../assets/icon/IcExpand.svg';
import MagazineImage from './MagazineImage';

const Magazine = () => {
  const { magazineId } = useParams();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { magazineResult, isLoading, isError } = useGetMagazineDetail(magazineId);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  useEffect(() => {
    if (magazineResult) {
      console.log(magazineResult.data.magazineIntro);
      setMagazineDetail(magazineResult.data);
    }
  }, [magazineResult]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <MagazineImage magazinePhotos={magazineDetail.magazinePhotos}></MagazineImage>
      <St.MagazineIntro>{magazineDetail.magazineIntro}</St.MagazineIntro>
      <St.MagazineQuestions>
        {magazineDetail.questions.map((question) => {
          return (
            // component로 분리, with key questionId
            <div>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={question.questionId}>
                  <St.MagazineQuestion> {`Q${question.questionOrder}`}</St.MagazineQuestion>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={question.questionId}>
                  <St.MagazineQuestion> {question.question}</St.MagazineQuestion>
                </div>
                <div className="header" {...getToggleProps()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isExpanded ? <IcCollapse /> : <IcExpand />}
                </div>
              </div>
              <div {...getCollapseProps()}>
                <St.MagazineIntro key={question.questionId}>{question.answer}</St.MagazineIntro>
                <St.MagazineIntro key={question.questionId}>{question.answerImage}</St.MagazineIntro>
                <St.MagazineIntro key={question.questionId}>{question.imageCaption}</St.MagazineIntro>
              </div>
            </div>
          );
        })}
      </St.MagazineQuestions>
    </St.MagazineWrapper>
  );
};

export default Magazine;

const St = {
  MagazineWrapper: styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    width: 100%;
    padding: 1rem;

    background-color: ${({ theme }) => theme.colors.Gam_Blue};
  `,

  MagazineIntro: styled.div`
    padding: 0rem 1rem;
    margin: 4.168rem 0rem 1.3rem 0rem;
    font-size: 1.5rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,

  MagazineQuestion: styled.div`
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium};
  `,

  MagazineQuestions: styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,
};
