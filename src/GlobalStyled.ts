import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyled = createGlobalStyle`
${reset};

* {
  font-family: "Noto Sans KR", serif !important;
  box-sizing: border-box;
  word-spacing: -1px;
}

a {
  text-decoration: none;
  display: block;
}

img {
  width: 100%;
  display: block;
}

:root {
  --main-color: #202124;
  --point-color: #673ab7;
  --sub-color: #4285f4;
  --background-color: #f0ebf8;
  --box-color: #fff;
  --border-color: #dadce0;
  --gray-1: #f1f3f4;
  --gray-2: ##B9B9B9;
  --gray-3: #80868b;
  --gray-4: #5f6368;

  --heading-size: 22px;
  --normal-size: 16px;
  --small-size: 14px;
}
`;
