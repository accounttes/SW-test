import { FC } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface LayoutProps {
  children: React.ReactNode;
}

import { QueryProvider } from "../providers";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { GlobalStyle, theme } from "../styles";
import { Header, Sidebar } from "@/widgets";

import * as S from "./Layout.styled";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      secondary: theme.colors.textSecondary,
    },
  },
});

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Header />
          <S.Content>
            <Sidebar />
            {children}
          </S.Content>
        </MuiThemeProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};

export { Layout };
