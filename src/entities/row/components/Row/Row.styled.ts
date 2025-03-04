import {
  TableRow as MuiTr,
  TableCell as MuiTd,
  Skeleton as MuiSkeleton,
} from "@mui/material";
import styled from "styled-components";

const TableRow = styled(MuiTr)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.card};
`;

const Skeleton = styled(MuiSkeleton)`
  background-color: red;
  height: 50.5px;
  width: 100%;
`;

export { TableRow, Skeleton };
