import { FC } from "react";

import * as S from "./Sidebar.styles";
import {
  Dashboard as MuiProjectIcon,
  ExpandMore as MuiExpandMoreIcon,
} from "@mui/icons-material";

interface SidebarProps {}

const projects = [
  "По проекту",
  "Объекты",
  "РД",
  "МТО",
  "СМР",
  "График",
  "МиМ",
  "Рабочие",
  "Капвложения",
  "Бюджет",
  "Финансирование",
  "Панорамы",
  "Камеры",
  "Поручения",
  "Контрагенты",
];

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <S.Sidebar elevation={3}>
      <S.Accordion defaultExpanded={true} elevation={3}>
        <S.AccordionTrigger expandIcon={<MuiExpandMoreIcon />}>
          Название проекта
        </S.AccordionTrigger>
        <S.AccordionContent>
          <S.ProjectsList>
            {projects.map((project) => (
              <S.ProjectItem selected={project === "СМР"}>
                <S.ProjectItemIcon>
                  <MuiProjectIcon />
                </S.ProjectItemIcon>
                <S.ProjectItemText>{project}</S.ProjectItemText>
              </S.ProjectItem>
            ))}
          </S.ProjectsList>
        </S.AccordionContent>
      </S.Accordion>
    </S.Sidebar>
  );
};

export { Sidebar };
