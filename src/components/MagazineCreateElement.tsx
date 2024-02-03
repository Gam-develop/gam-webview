import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminContentLayout from './AdminContentLayout';

interface InputProps {
  register: any;
  setValue: any;
  watch: any;
  inputPlaceholer: string;
  inputMaxLength: number;
  inputHeight: number;
  registerField: string;
}

const MagazineCreateElement = (props: InputProps) => {
  const { register, setValue, inputPlaceholer, inputMaxLength, inputHeight, registerField, watch } = props;

  // watch를 사용하여 특정 필드의 값을 추적
  const watchedValue = watch(registerField);

  const isRequired = registerField.includes('imageCaption') ? false : true;

  const inputStyle = {
    height: `${inputHeight}rem`,
  };

  // useEffect를 사용하여 값이 변경될 때 실행되는 부가적인 작업 수행
  useEffect(() => {
    if (watchedValue.length > inputMaxLength) {
      window.alert(`최대 ${inputMaxLength}자까지 입력가능합니다.`);
      setValue(registerField, watchedValue.slice(0, inputMaxLength));
    }
  }, [watchedValue, inputMaxLength]);

  return (
    <>
      <St.Wrapper>
        <St.TitleInput style={inputStyle} type="text" placeholder={inputPlaceholer} {...register(registerField, { required: isRequired, maxLength: inputMaxLength })} />
        <St.InputCounter>
          {watchedValue.length}/{inputMaxLength}
        </St.InputCounter>
      </St.Wrapper>
    </>
  );
};

export default MagazineCreateElement;

const St = {
  Wrapper: styled.div`
    position: relative;
  `,
  TitleInput: styled.textarea`
    overflow-y: hidden;
    /* position: relative; */
    width: 100%;
    resize: none; /* 사용자 조절 비활성화 */

    padding: 2rem 2.4rem 4rem 2rem;
    margin-top: 2.4rem;

    border: none;
    outline: none;

    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Regular_16};

    &::placeholder {
      color: ${({ theme }) => theme.colors.Gam_Gray};
    }
  `,
  InputCounter: styled.p`
    position: absolute;
    right: 0.8rem;
    bottom: 0.8rem;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.Gam_Gray};
    ${({ theme }) => theme.fonts.Gam_Contend_Pretendard_Bold_16};
  `,
};
