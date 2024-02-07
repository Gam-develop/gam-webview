import styled from 'styled-components';
import { ReactComponent as IcExpand } from '../assets/icon/IcExpand.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { makeStyles } from '@material-ui/core';
import { magazineQuestionInfo } from '../types/magazine';

const useStyles = makeStyles({
  customIconRotation: {
    '&.Mui-expanded .css-yw020d-MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(90deg) !important',
    },
    '&.Mui-expanded .css-1fx8m19': {
      transform: 'rotate(90deg) !important',
    },
    '& .css-o4b71y-MuiAccordionSummary-content': {
      margin: '0px !important',
    },
  },
});

const MagazineQuestion = ({ magazineQuestions }: { magazineQuestions: magazineQuestionInfo[] }) => {
  const classes = useStyles();

  return (
    <St.MagazineQuestions>
      {magazineQuestions.map((question: magazineQuestionInfo) => {
        return (
          <div key={question.questionId}>
            <Accordion
              sx={{
                boxShadow: 'unset',
                position: 'unset',
                marginBottom: '4.0rem',
                backgroundColor: '#f4f4f4',
              }}
            >
              <AccordionSummary
                style={{ paddingLeft: '2rem' }}
                expandIcon={<IcExpand />}
                className={classes.customIconRotation}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <St.MagazineQuestionWrapper>
                  <St.MagazineQuestionNumberWrapper>
                    <St.MagazineQuestion> {`Q${question.questionOrder}`}</St.MagazineQuestion>
                  </St.MagazineQuestionNumberWrapper>
                  <St.MagazineQuestionContentWrapper>
                    <St.MagazineQuestion> {question.question}</St.MagazineQuestion>
                  </St.MagazineQuestionContentWrapper>
                </St.MagazineQuestionWrapper>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 0,
                  marginTop: '2.6rem',
                }}
              >
                {question.answerImage && (
                  <St.MagazineQuestionImageWrapper>
                    <St.MagazineQuestionImage src={question.answerImage} />
                  </St.MagazineQuestionImageWrapper>
                )}
                <St.MagazineAnswer>
                  <St.MagazineQuestionCaption>{question.imageCaption}</St.MagazineQuestionCaption>
                  <St.MagazineQuestionAnswer>{question.answer}</St.MagazineQuestionAnswer>
                </St.MagazineAnswer>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </St.MagazineQuestions>
  );
};

export default MagazineQuestion;

const St = {
  MagazineQuestions: styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium_16};
  `,

  MagazineQuestionWrapper: styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
  `,

  MagazineQuestionNumberWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.8rem;
  `,

  MagazineQuestionContentWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24rem;
  `,

  MagazineQuestionToggleWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
  `,

  MagazineQuestionElementWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  MagazineQuestion: styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium_16};
  `,

  MagazineAnswer: styled.div``,

  MagazineQuestionImageWrapper: styled.div`
    padding: 0 1.8rem;
    width: 100%;
    height: 19.1rem;
    aspect-ratio: 16/9;
    /* border: 1px solid black; */
  `,

  MagazineQuestionImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  MagazineQuestionNoImage: styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.Gam_GrayBorder};
    position: relative;
    p {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_24};
      color: ${({ theme }) => theme.colors.Gam_Gray};
    }
  `,

  MagazineQuestionCaption: styled.div`
    white-space: pre-wrap;
    margin-top: 0.8rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.Gam_Gray};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_12};
  `,

  MagazineQuestionAnswer: styled.div`
    padding: 0 2rem;
    margin: 2.6rem 0rem 4.1rem 0rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};
  `,
};
