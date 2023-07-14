import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IcExpand } from '../assets/icon/IcExpand.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  customIconRotation: {
    '& .css-yw020d-MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg) !important',
    },
  },
});

const MagazineQuestion = (props) => {
  const { magazineQuestions } = props;
  const classes = useStyles();

  return (
    <St.MagazineQuestions>
      {magazineQuestions.map((question) => {
        return (
          <>
            <Accordion
              sx={{
                boxShadow: 'unset',
                position: 'unset',
              }}
            >
              <AccordionSummary
                className={classes.customIconRotation}
                expandIcon={<IcExpand />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  padding: 0,
                }}
              >
                <St.MagazineQuestionWrapper>
                  <St.MagazineQuestionNumberWrapper key={question.questionId}>
                    <St.MagazineQuestion> {`Q${question.questionOrder}`}</St.MagazineQuestion>
                  </St.MagazineQuestionNumberWrapper>
                  <St.MagazineQuestionContentWrapper key={question.questionId}>
                    <St.MagazineQuestion> {question.question}</St.MagazineQuestion>
                  </St.MagazineQuestionContentWrapper>
                </St.MagazineQuestionWrapper>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: 0,
                }}
              >
                <St.MagazineAnswer>
                  <St.MagazineQuestionImage key={question.questionId} src={question.answerImage} />
                  <St.MagazineQuestionCaption key={question.questionId}>{question.imageCaption}</St.MagazineQuestionCaption>
                  <St.MagazineQuestionAnswer key={question.questionId}>{question.answer}</St.MagazineQuestionAnswer>
                </St.MagazineAnswer>
              </AccordionDetails>
            </Accordion>
          </>
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
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
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
    margin-right: 0.75rem;
  `,

  MagazineQuestionContentWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Medium};
  `,

  MagazineAnswer: styled.div``,

  MagazineQuestionImage: styled.img`
    width: 100%;
  `,

  MagazineQuestionCaption: styled.div`
    font-size: 1.5rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Gray};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_12};
  `,

  MagazineQuestionAnswer: styled.div`
    margin: 2.168rem 0rem 2.168rem 0rem;
    font-size: 1.5rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,
};
