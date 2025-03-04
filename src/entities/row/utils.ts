import { Row, Table } from "@tanstack/react-table";
import { RowId, RowResponse, TreeRowResponse } from "./types";

const deleteRow = (
  rows: TreeRowResponse[],
  rowIdToDelete: RowId
): TreeRowResponse[] => {
  return rows.reduce<TreeRowResponse[]>((acc, row) => {
    if (row.id === rowIdToDelete) {
      return acc;
    } else if (row.child && row.child.length > 0) {
      const updatedChildren = deleteRow(row.child, rowIdToDelete);
      if (updatedChildren.length > 0) {
        acc.push({ ...row, child: updatedChildren });
      } else {
        acc.push({ ...row, child: [] });
      }
    } else {
      acc.push(row);
    }
    return acc;
  }, []);
};

function createOutlayBlankRow(
  tree: TreeRowResponse[],
  parentId: RowId | null
): TreeRowResponse[] {
  const blank: TreeRowResponse = {
    id: "creation",
    rowName: "",
    child: [],
    salary: 0,
    overheads: 0,
    estimatedProfit: 0,
    equipmentCosts: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,
  };

  if (parentId === null) {
    tree.push(blank);
  }

  const node = searchNode(tree, parentId);
  if (node !== null) node.child.push(blank);

  return tree;
}

function searchNode(
  tree: TreeRowResponse[],
  id: RowId | null
): TreeRowResponse | null {
  const stack = [...tree];

  while (stack.length) {
    const node = stack.pop()!;
    if (node.id === id) return node;
    stack.push(...node.child);
  }

  return null;
}

const insertRow = (
  rows: TreeRowResponse[],
  rowToInsert: TreeRowResponse,
  parentId: RowId | null
): TreeRowResponse[] => {
  return rows.map((row) => {
    if (row.id === parentId) {
      return {
        ...row,
        child: row.child
          .concat(rowToInsert)
          .filter((row) => row.id !== "creation"),
      };
    }

    if (row.child.length > 0) {
      return { ...row, child: insertRow(row.child, rowToInsert, parentId) };
    }

    return row;
  });
};

const updateNode = (
  tree: TreeRowResponse[],
  id: RowId,
  updates: Partial<TreeRowResponse>
): TreeRowResponse[] => {
  const node = searchNode(tree, id);
  if (node) {
    Object.assign(node, updates);
  }
  return tree;
};

const applyUpdates = (
  tree: TreeRowResponse[],
  current: RowResponse,
  changed: RowResponse[]
): TreeRowResponse[] => {
  let updatedTree = updateNode(tree, current.id, current);

  for (const change of changed) {
    updatedTree = updateNode(updatedTree, change.id, change);
  }

  return updatedTree;
};

const getParentIndex = (
  table: Table<TreeRowResponse>,
  row: Row<TreeRowResponse>
) =>
  table
    .getRowModel()
    .flatRows.findIndex(
      (flatRow) => flatRow.getParentRow()?.id === row.getParentRow()?.id
    );

export {
  applyUpdates,
  insertRow,
  updateNode,
  searchNode,
  deleteRow,
  getParentIndex,
  createOutlayBlankRow,
};
