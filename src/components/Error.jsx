import React from 'react';
import styled from 'styled-components';

const Error = () => {
  return (
    <StErrorWrapper>
      <p>해당 페이지를 찾을 수 없어요.</p>
      <p> 올바른 URL을 입력했는지 확인해주세요!</p>
    </StErrorWrapper>
  );
};

export default Error;

const StErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  & > svg {
    margin-bottom: 3rem;
  }
  & > p {
    color: ${({ theme }) => theme.colors.Sopt_Pink};
    ${({ theme }) => theme.fonts.B_Title_1};
  }
`;
