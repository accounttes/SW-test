import { FC, useState } from "react";
import * as S from "./Header.styled";
import {
  Apps as MuiAppsIcon,
  Reply as MuiReplyIcon,
} from "@mui/icons-material";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [activeTab, setActiveTab] = useState("manage");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <S.Header elevation={3}>
      <S.ButtonsContainer>
        <S.Button>
          <MuiAppsIcon />
        </S.Button>
        <S.Button>
          <MuiReplyIcon />
        </S.Button>
      </S.ButtonsContainer>
      <S.Tabs value={activeTab} onChange={handleTabChange}>
        <S.Tab label="Управление" value="manage" />
        <S.Tab label="Просмотр" value="view" />
      </S.Tabs>
    </S.Header>
  );
};

export { Header };
