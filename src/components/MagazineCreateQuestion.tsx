import React from 'react';
import styled from 'styled-components';
import { magazineQuestionAdminInfo } from '../types/magazine';

interface InputProps {
  inputValue: magazineQuestionAdminInfo[];
  handleChangeInput: (changedQuestions: magazineQuestionAdminInfo[]) => void;
}

const MagazineCreateQuestion = (props: InputProps) => {
  //const { inputValue, handleChangeInput } = props;

  return <div>test</div>;
};

export default MagazineCreateQuestion;

const St = {
  TitleInput: styled.textarea<{ height?: number }>`
    height: ${({ height }) => `${height}.rem`};
    width: 100%;

    padding: 2rem 2.4rem 4rem 2rem;
    margin-top: 2.4rem;

    border: none;
    outline: none;

    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};

    &::placeholder {
      color: ${({ theme }) => theme.colors.Gam_Gray};
    }
  `,
};
