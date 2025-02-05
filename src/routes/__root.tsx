import Layout from "@/app/Layout";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Suspense, lazy } from "react";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout />
      <Suspense>
        <Devtool position="top-right" />
      </Suspense>
    </>
  ),
});

const Devtool =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
