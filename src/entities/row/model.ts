import { RowId } from "./types";

const EID = 139263;

const QUERY_KEYS = {
  root: () => ["rows", EID],
  create: () => [...QUERY_KEYS.root(), "create", EID] as const,
  update: (rid: RowId) => [...QUERY_KEYS.root(), "update", EID, rid] as const,
  delete: (rid: RowId) => [...QUERY_KEYS.root(), "delete", EID, rid] as const,
};

const ENDPOINTS = {
  get: () => `outlay-rows/entity/${EID}/row/list`,
  update: (rid: RowId) => `outlay-rows/entity/${EID}/row/${rid}/update`,
  create: () => `outlay-rows/entity/${EID}/row/create`,
  delete: (rid: RowId) => `outlay-rows/entity/${EID}/row/${rid}/delete`,
};

export { QUERY_KEYS, ENDPOINTS, EID };
