import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IcExpand } from '../assets/icon/IcExpand.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { makeStyles } from '@material-ui/core';
import { magazineQuestionInfo } from '../types/magazine';

const useStyles = makeStyles({
  customIconRotation: {
    '& .css-yw020d-MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
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
                // backgroundColor: '#F4F4F4',
              }}
            >
              <AccordionSummary
                className={classes.customIconRotation}
                expandIcon={<IcExpand />}
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
                  marginTop: '1.625rem',
                }}
              >
                <St.MagazineAnswer>
                  <St.MagazineQuestionImageWrapper>
                    <St.MagazineQuestionImage src={question.answerImage} />
                  </St.MagazineQuestionImageWrapper>
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
    margin-right: 0.8rem;
  `,

  MagazineQuestionContentWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 248px;
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

  MagazineQuestionImageWrapper: styled.div`
    height: 19.1rem;
  `,

  MagazineQuestionImage: styled.img`
    width: 100%;
    height: 100%;
  `,

  MagazineQuestionCaption: styled.div`
    font-size: 1.5rem;
    white-space: pre-wrap;
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.Gam_Gray};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_12};
  `,

  MagazineQuestionAnswer: styled.div`
    margin: 2.6rem 0rem 4rem 0rem;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.Gam_Black};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular};
  `,
};
