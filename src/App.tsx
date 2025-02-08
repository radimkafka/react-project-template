import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import { routeTree } from "./routeTree.gen";
import "./translations/i18n";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { setupClient } from "./api/Api";
import { handleResponseError } from "./api/apiUtils";

const queryClient = new QueryClient({
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
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  setupClient({
    apiUrl: `${import.meta.env.VITE_API_URL}`,
    jwtKey: undefined,
    requestMiddlewares: [
      {
        name: "apikey",
        fn: (req) => {
          // hack to make omdbapi work
          req.url = req.url.replace(/(i|s)\?/, `apikey=${import.meta.env.VITE_API_KEY}&`);
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
