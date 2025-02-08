import Layout from "@/app/Layout";
import TanstackDevtools from "@/components/tanstack-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <Layout />
      <TanstackDevtools />
    </>
  ),
});
