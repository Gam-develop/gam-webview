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

const Magazine = () => {
  const { magazineId } = useParams();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { magazineResult, isLoading, isError } = useGetMagazineDetail(magazineId);

  const setMagazineDetail = useSetRecoilState(magazineDetailState);
  const magazineDetail = useRecoilValue(magazineDetailState);

  useEffect(() => {
    if (magazineResult) {
      setMagazineDetail(magazineResult.data);
    }
  }, [magazineResult]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <ErrorPage />;

  return (
    <St.MagazineWrapper>
      <St.MagazineImage>{magazineDetail.magazinePhotos}</St.MagazineImage>
      <St.MagazineIntro>{magazineDetail.magazineIntro}</St.MagazineIntro>
      <St.MagazineQuestions>
        {magazineDetail.questions.map((question) => {
          return (
            // component로 분리, with key questionId
            <div>
              <St.MagazineIntro key={question.questionId}>{question.question}</St.MagazineIntro>
              <div className="header" {...getToggleProps()}>
                {isExpanded ? <IcCollapse /> : <IcExpand />}
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

  MagazineIntro: styled.h3`
    padding: 0rem 2rem;
    margin: 2.168rem 0rem 1.3rem 0rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.B_Content_1};
  `,

  MagazineImage: styled.h3`
    padding: 0rem 2rem;
    margin: 2.168rem 0rem 1.3rem 0rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.B_Content_1};
  `,

  MagazineQuestions: styled.div`
    padding: 0rem 2rem;
    margin: 2.168rem 0rem 1.3rem 0rem;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.B_Content_1};
  `,
};
