import Page from "@/app/dashboard/page";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Page />
      <TanStackRouterDevtools />
    </>
  ),
});
