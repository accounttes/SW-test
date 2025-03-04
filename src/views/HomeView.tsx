import { rowModel, rowQueries, rowTypes } from "@/entities/row";
import { columns } from "@/widgets/DataTable/DataTable.columns";
import { queryClient } from "@/shared/react-query";
import { FC } from "react";
import { DataTable } from "@/widgets";

interface HomeViewProps {}

const HomeView: FC<HomeViewProps> = ({}) => {
  rowQueries.useRowsQuery();

  const list = queryClient.getQueryData<rowTypes.TreeRowResponse[]>(
    rowModel.QUERY_KEYS.root()
  );
  const state = queryClient.getQueryState(rowModel.QUERY_KEYS.root());

  if (list)
    return (
      <DataTable columns={columns} data={list} key={state?.dataUpdatedAt} />
    );
};

export { HomeView };
