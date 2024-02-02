import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminContentLayout from './AdminContentLayout';

interface InputProps {
  register: any;
  inputPlaceholer: string;
  inputMaxLength: number;
  inputHeight: number;
  registerField: string;
  onFormChange: Function;
  defaultValue: string;
}

const MagazineCreateElement = (props: InputProps) => {
  const { register, inputPlaceholer, inputMaxLength, inputHeight, registerField, onFormChange, defaultValue } = props;

  const isRequired = registerField.includes('imageCaption') ? false : true;

  const inputStyle = {
    height: `${inputHeight}rem`,
  };

  const [inputValue, setInputValue] = useState<string>(defaultValue || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length <= inputMaxLength) {
      setInputValue(value);
      // onFormChange 콜백을 호출하여 부모 컴포넌트에 폼 변경 알림
      onFormChange(registerField, value);
    } else if (value.length > inputMaxLength) {
      window.alert(`최대 ${inputMaxLength}자까지 입력가능합니다.`);
      setInputValue(value.slice(0, inputMaxLength));
    }
  };

  return (
    <>
      <St.Wrapper>
        <St.TitleInput style={inputStyle} type="text" placeholder={inputPlaceholer} {...register(registerField, { required: isRequired, maxLength: inputMaxLength })} onChange={handleInputChange} value={inputValue} />
        <St.InputCounter>
          {inputValue.length}/{inputMaxLength}
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
