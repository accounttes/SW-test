"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/react-query";

function QueryProvider({ children }: React.PropsWithChildren) {
  const qc = queryClient;
  return (
    <QueryClientProvider client={qc}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { QueryProvider };
