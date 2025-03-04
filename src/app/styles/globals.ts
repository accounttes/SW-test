import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body {
  font-size: 14px;
  height: 100%;
  min-width: 320px;
  margin: 0 auto;
  font-family: Roboto, Arial, sans-serif;
  background-color: ${({ theme }) => theme.colors.bg};
  color: white;

  &::-webkit-scrollbar {
    width: 1.0714rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.bg};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.card};

   
  }
}


`;

export { GlobalStyle };
