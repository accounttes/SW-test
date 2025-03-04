import { useQueryClient } from "@tanstack/react-query";
import { createOutlayBlankRow } from "@/entities/row/utils";
import { rowModel, rowTypes } from "@/entities/row";
import { useTableStore } from "@/entities/row/store";

type AddEmptyRowType = {
  rid: rowTypes.RowId | null;
  parentId: rowTypes.RowParentId;
};

export const useEmptyRowTrigger = () => {
  const queryClient = useQueryClient();
  const { setEditableRowIds, setMode, editableRowIds } = useTableStore();

  const addEmptyRow = ({ rid, parentId }: AddEmptyRowType) => {
    setEditableRowIds({
      rid: "creation",
      parentId: rid,
    });
    const list = queryClient.getQueryData<rowTypes.TreeRowResponse[]>(
      rowModel.QUERY_KEYS.root()
    );

    if (!list) return;

    const updatedList = createOutlayBlankRow(list, rid);

    setMode("creation");

    console.log({ updatedList });

    queryClient.setQueryData(rowModel.QUERY_KEYS.root(), updatedList);
  };

  return { addEmptyRow };
};
