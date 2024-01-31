import { createGlobalStyle, css } from 'styled-components';

export const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 62.5%;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  ƒ hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
  }
`;

export const GlobalStyle = createGlobalStyle`
${reset}
.notosanskr * { 
 font-family: 'Noto Sans KR';
}

#root, body, html {
    height: 100vh;
    margin: 0 auto;
    overflow-y: auto;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    background-color: #F4F4F4;

    &.modal-open{
      background-color: #b3b3b3;
    }
}

#root::-webkit-scrollbar {
    display: none; 
}
  
* {
    box-sizing: border-box;
}

/* .modal-open{
  background-color: #B3B3B3;
  /* 다른 스타일 속성들도 필요하다면 여기에 추가할 수 있습니다. */
}
     */
`;

export default GlobalStyle;
