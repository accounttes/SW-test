import { z } from "zod";
import { TreeRowResponse } from "./types";

const RowsSchema = z.object({
  id: z.number().min(1),
  rowName: z.string(),
});

const RowId = z.union([z.number(), z.string()]);

const RowResponse = z.object({
  equipmentCosts: z.number(),
  estimatedProfit: z.number(),
  id: RowId,
  machineOperatorSalary: z.number(),
  mainCosts: z.number(),
  materials: z.number(),
  mimExploitation: z.number(),
  overheads: z.number(),
  rowName: z.string(),
  salary: z.number(),
  supportCosts: z.number(),
  total: z.number(),
});

const TreeRowResponse: z.ZodType<TreeRowResponse> = RowResponse.extend({
  child: z.lazy(() => TreeRowResponse.array()),
});

const RowParentId = RowId.nullable();

const RowRequest = z.object({
  equipmentCosts: z.coerce.number(),
  estimatedProfit: z.coerce.number(),
  machineOperatorSalary: z.coerce.number(),
  mainCosts: z.coerce.number(),
  materials: z.coerce.number(),
  mimExploitation: z.coerce.number(),
  overheads: z.coerce.number(),
  parentId: RowId.nullable(),
  rowName: z.string(),
  salary: z.coerce.number(),
  supportCosts: z.coerce.number(),
});

const RowUpdate = z.object({
  equipmentCosts: z.number(),
  estimatedProfit: z.number(),
  machineOperatorSalary: z.number(),
  mainCosts: z.number(),
  materials: z.number(),
  mimExploitation: z.number(),
  overheads: z.number(),
  rowName: z.string(),
  salary: z.number(),
  supportCosts: z.number(),
});

const RecalculateRowResponse = z.object({
  current: RowResponse,
  changed: z.array(RowResponse),
});

export {
  RowsSchema,
  RowRequest,
  RowResponse,
  TreeRowResponse,
  RecalculateRowResponse,
  RowUpdate,
  RowId,
  RowParentId,
};
