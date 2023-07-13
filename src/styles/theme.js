import { css } from 'styled-components';

const colors = {
  Gam_Purple: '#ADA2FF',
  Gam_Yellow: '#E1FF29',
  Gam_Gray: '#b3b3b3',
  Gam_Coral: '#FF8787',
  Gam_White: '#FFFFFF',
  Gam_Black: '#373737',
};

const fonts = {
  Gam_Contend_Pretendard_Regular: css`
    font-family: 'Pretendard', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 2.3rem;
  `,
  Gam_Contend_Pretendard_Medium: css`
    font-family: 'PretendardMedium', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.3rem;
  `,
};

const theme = {
  colors,
  fonts,
};
export default theme;
