import { z } from "zod";
import { RowsSchema } from "./schemas";
import { rowSchemas, rowTypes } from ".";

type RowsType = z.infer<typeof RowsSchema>;
type RowRequest = z.infer<typeof rowSchemas.RowRequest>;
type RowUpdate = z.infer<typeof rowSchemas.RowUpdate>;
type RowResponse = z.infer<typeof rowSchemas.RowResponse>;
type TreeRowResponse = z.infer<typeof rowSchemas.RowResponse> & {
  child: TreeRowResponse[];
};
type RecalculateRowResponse = z.infer<typeof rowSchemas.RecalculateRowResponse>;
type RowId = z.infer<typeof rowSchemas.RowId>;
type RowParentId = z.infer<typeof rowSchemas.RowParentId>;

export type {
  RowsType,
  RowRequest,
  RowResponse,
  RowUpdate,
  TreeRowResponse,
  RecalculateRowResponse,
  RowId,
  RowParentId,
};
