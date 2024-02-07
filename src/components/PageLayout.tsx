import React from 'react';
import styled, { css } from 'styled-components';

const PageLayout = (props: any) => {
  const { children } = props;
  return <St.PageWrapper>{children}</St.PageWrapper>;
};

export default PageLayout;

const St = {
  PageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    width: 100%;
    height: 100%;
  `,
};
