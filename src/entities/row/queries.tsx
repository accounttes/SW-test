import { useMutation, useQuery } from "@tanstack/react-query";
import { httpRequest } from "@/shared/lib/axios";
import { queryClient } from "@/shared/react-query";
import { applyUpdates, deleteRow, insertRow } from "./utils";
import { ENDPOINTS, QUERY_KEYS } from "./model";
import {
  RowUpdate,
  TreeRowResponse,
  RecalculateRowResponse,
  RowId,
  RowRequest,
} from "./types";

const list = async () => {
  const res = await httpRequest<TreeRowResponse[]>({
    method: "get",
    url: ENDPOINTS.get(),
  });

  return res;
};

const update = async (data: RowUpdate, rid: RowId) => {
  const res = await httpRequest<RecalculateRowResponse>({
    method: "post",
    url: ENDPOINTS.update(rid),
    data,
  });

  return res;
};

const remove = async (rid: RowId) => {
  const res = await httpRequest<RecalculateRowResponse>({
    method: "delete",
    url: ENDPOINTS.delete(rid),
  });

  return res;
};

const create = async (data: RowRequest) => {
  const res = await httpRequest<RecalculateRowResponse>({
    method: "post",
    url: ENDPOINTS.create(),
    data,
  });

  return res;
};

export function useRowsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.root(),
    queryFn: list,
  });
}

export function useRowsUpdateMutation(rid: RowId) {
  return useMutation({
    mutationKey: QUERY_KEYS.update(rid),
    mutationFn: async (data: RowUpdate) => update(data, rid),
    onSuccess(data, variables, context) {
      const { current, changed } = data;

      const list = queryClient.getQueryData<TreeRowResponse[]>(
        QUERY_KEYS.root()
      );

      if (!list) return;

      const updatedList = applyUpdates(list, current, changed);

      console.log({ data, variables, list, updatedList });

      queryClient.setQueryData(QUERY_KEYS.root(), updatedList);
    },
  });
}

export function useRowsCreateMutation() {
  return useMutation({
    mutationKey: QUERY_KEYS.create(),
    mutationFn: async (data: RowRequest) => create(data),
    onSuccess(data, variables, context) {
      const { current } = data;

      const list = queryClient.getQueryData<TreeRowResponse[]>(
        QUERY_KEYS.root()
      );

      if (!list) return;

      const newTreeRow: TreeRowResponse = { ...current, child: [] };
      const updatedList = insertRow(list, newTreeRow, variables.parentId!);

      console.log({ updatedList, newTreeRow });

      queryClient.setQueryData(QUERY_KEYS.root(), updatedList);
    },
  });
}

export function useRowsDeleteMutation(rid: RowId) {
  return useMutation({
    mutationKey: QUERY_KEYS.delete(rid),
    mutationFn: async () => remove(rid), 
    onSuccess(data, variables, context) {
      const list = queryClient.getQueryData<TreeRowResponse[]>(
        QUERY_KEYS.root()
      );

      if (!list) return;

      const updatedList = deleteRow(list, rid);

      queryClient.setQueryData(QUERY_KEYS.root(), updatedList);
    },
  });
}
