import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import styled from "styled-components";

const Sidebar = styled(Paper)`
  width: 240px;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.card};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Accordion = styled(MuiAccordion)``;
const AccordionTrigger = styled(AccordionSummary)`
  .MuiAccordionSummary-root {
    padding-block: 1px !important;
    margin-block: 0px !important;
    min-height: auto !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.card} !important;
  }
`;
const AccordionContent = styled(AccordionDetails)`
  padding: 0 !important;
`;

const ProjectsList = styled(MenuList)``;
const ProjectItem = styled(MenuItem)``;
const ProjectItemText = styled(ListItemText)``;
const ProjectItemIcon = styled(ListItemIcon)``;

export {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  Sidebar,
  ProjectsList,
  ProjectItem,
  ProjectItemText,
  ProjectItemIcon,
};
