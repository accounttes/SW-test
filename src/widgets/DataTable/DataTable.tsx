import { rowQueries, rowSchemas, rowTypes } from "@/entities/row";

import { useState, useEffect } from "react";
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useEmptyRowTrigger } from "@/entities/row/hooks";
import { Row } from "../../entities/row/components/Row";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTableStore } from "@/entities/row/store";
import { Form } from "@/shared/ui";

import * as S from "./DataTable.styled";
import { getParentIndex } from "@/entities/row/utils";

type DataTableProps = {
  columns: ColumnDef<rowTypes.TreeRowResponse>[];
  data: rowTypes.TreeRowResponse[];
};

function DataTable({ columns, data }: DataTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const { addEmptyRow } = useEmptyRowTrigger();
  const { mode, setMode, editableRowIds, setEditableRowIds } = useTableStore();
  const form = useForm<z.infer<typeof rowSchemas.RowRequest>>({
    resolver: zodResolver(rowSchemas.RowRequest),
    defaultValues: {
      machineOperatorSalary: 0,
      mimExploitation: 0,
      materials: 0,
      supportCosts: 0,
      mainCosts: 0,
      parentId: editableRowIds?.parentId || null,
    },
  });

  const { mutateAsync: updateRow, isPending: isRowUpdatePending } =
    rowQueries.useRowsUpdateMutation(editableRowIds?.rid!);
  const { mutateAsync: createRow, isPending: isRowCreatePending } =
    rowQueries.useRowsCreateMutation();

  async function onSubmit(values: z.infer<typeof rowSchemas.RowRequest>) {
    if (mode === "creation") await createRow(values);

    if (mode === "editing") await updateRow(values);
    setMode("none");
    setEditableRowIds(null);
  }

  useEffect(() => {
    if (data.length === 0) {
      addEmptyRow({ rid: null, parentId: null });
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.child,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const isDataLoading = isRowCreatePending || isRowUpdatePending;

  return (
    <Form {...form}>
      <form
        id={editableRowIds?.rid?.toString()}
        className="form"
        key={editableRowIds?.rid?.toString()}
        onSubmit={form.handleSubmit(onSubmit)}
      />

      <TableContainer>
        <S.TitleContainer>
          <S.Title>Строительно-монтажные работы</S.Title>
        </S.TitleContainer>

        <Table>
          <S.TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <S.Th key={header.id} $id={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </S.Th>
                  );
                })}
              </TableRow>
            ))}
          </S.TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, i, arr) => {
              return (
                <Row
                  row={row}
                  index={i}
                  isLoading={isDataLoading}
                  key={row.id}
                  parentIndex={getParentIndex(table, row)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Form>
  );
}

export { DataTable };
