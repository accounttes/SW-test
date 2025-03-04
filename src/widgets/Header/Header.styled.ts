import {
  Button as MuiButton,
  Paper,
  Tabs as MuiTabs,
  Tab as MuiTab,
} from "@mui/material";

import styled from "styled-components";

const Header = styled(Paper)`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.card};
`;

const ButtonsContainer = styled.div``;

const Button = styled(MuiButton)`
  aspect-ratio: 1;
`;

const Tabs = styled(MuiTabs)``;
const Tab = styled(MuiTab)``;

export { Header, ButtonsContainer, Button, Tab, Tabs };
