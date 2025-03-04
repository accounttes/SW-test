import { create } from "zustand";
import { RowId, RowParentId } from "./types";

type ModeType = "editing" | "creation" | "none";
type Ids = {
  rid: RowId | undefined;
  parentId: RowParentId | undefined;
};

type Store = {
  editableRowIds?: Ids | null;
  mode?: ModeType;
  setEditableRowIds: (variables: Ids | null) => void;
  setMode: (mode: ModeType | undefined) => void; 
};

const useTableStore = create<Store>((set) => ({
  mode: "none",

  setEditableRowIds: (variables) =>
    set(() => ({
      editableRowIds: {
        rid: variables?.rid,
        parentId: variables?.parentId || null,
      },
    })),
  setMode: (mode) => set(() => ({ mode })),
}));

export { useTableStore };
