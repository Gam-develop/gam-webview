import React from 'react';
import styled from 'styled-components';

interface InputProps {
  inputValue: string;
  inputPlaceholer: string;
  inputMaxLength: number;
  inputHeight: number;
  handleChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MagazineCreateElement = (props: InputProps) => {
  const { inputValue, inputPlaceholer, inputMaxLength, inputHeight, handleChangeInput } = props;

  return (
    <>
      <St.TitleInput value={inputValue} onChange={handleChangeInput} placeholder={inputPlaceholer} maxLength={inputMaxLength} height={inputHeight} />
    </>
  );
};

export default MagazineCreateElement;

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
