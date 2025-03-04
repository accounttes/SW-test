import { TableHead as MuiTh, TableRow } from "@mui/material";
import styled from "styled-components";

const TableHead = styled(MuiTh)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.card};
  border-top: 1px solid ${({ theme }) => theme.colors.card};
`;

const Th = styled.th<{ $id: string }>`
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  padding: 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};

  width: ${(props) => (props.id === "rowName" ? "100%" : "auto")};
  min-width: ${(props) => (props.id === "id" ? "110px" : "200px")};
`;

const Title = styled.h1`
  font-size: 1.125rem;
`;

const TitleContainer = styled.div`
  padding-block: 0.6875rem;
  padding-inline: 1rem;
  width: max-content;
  border-right: 1px solid ${({ theme }) => theme.colors.card};
`;

export { TableHead, Th, Title, TitleContainer };
