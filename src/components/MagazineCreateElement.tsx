import React from 'react';
import styled from 'styled-components';

interface InputProps {
  register: any;
  inputPlaceholer: string;
  inputMaxLength: number;
  inputHeight: number;
  registerField: string;
}

const MagazineCreateElement = (props: InputProps) => {
  const { register, inputPlaceholer, inputMaxLength, inputHeight, registerField } = props;

  const isRequired = registerField.includes('imageCaption') ? false : true;

  const inputStyle = {
    height: `${inputHeight}rem`,
  };

  return (
    <>
      <St.TitleInput style={inputStyle} type="text" placeholder={inputPlaceholer} {...register(registerField, { required: isRequired, maxLength: inputMaxLength })} />
    </>
  );
};

export default MagazineCreateElement;

const St = {
  TitleInput: styled.textarea`
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
