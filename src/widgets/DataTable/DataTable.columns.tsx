import { ColumnDef } from "@tanstack/react-table";
import { rowTypes } from "../../entities/row";
import { Controls } from "../../entities/row/components/Controls";
import * as S from "./DataTable.styled";

type ColumnHeader<T> = {
  accessorKey: keyof T;
  header: string;
};

const headers: ColumnHeader<rowTypes.RowResponse>[] = [
  { accessorKey: "rowName", header: "Наименование работ" },
  { accessorKey: "salary", header: "Основная з/п" },
  { accessorKey: "equipmentCosts", header: "Оборудование" },
  { accessorKey: "overheads", header: "Накладные расходы" },
  { accessorKey: "estimatedProfit", header: "Сметная прибыль" },
];

export const columns: ColumnDef<rowTypes.TreeRowResponse>[] = [
  {
    accessorKey: "id",
    header: "Уровень",
  },

  ...(headers.map((header) => ({
    ...header,
  })) as ColumnDef<rowTypes.TreeRowResponse>[]),
];
