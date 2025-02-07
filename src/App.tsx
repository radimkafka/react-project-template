import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import { routeTree } from "./routeTree.gen";
import "./translations/i18n";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getS, getT, setupClient } from "./api/Api";
import { handleResponseError } from "./api/apiUtils";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleResponseError,
        }),
        mutationCache: new MutationCache({
          onError: handleResponseError,
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  setupClient({
    apiUrl: `${import.meta.env.VITE_API_URL}`,
    jwtKey: undefined,
    requestMiddlewares: [
      {
        name: "apikey",
        fn: (req) => {
          // hack to make omdbapi work
          req.url = req.url.replace("s?", `apikey=${import.meta.env.VITE_API_KEY}&`);
          req.options.headers = {};
          return req;
        },
      },
    ],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} basepath={import.meta.env.PROD ? "/react-project-template/" : undefined} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
