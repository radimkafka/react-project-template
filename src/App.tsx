import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/theme-provider";
import { routeTree } from "./routeTree.gen";
import "./translations/i18n";
import { useEffect } from "react";
import { getS, getT, setupClient } from "./api/Api";

const router = createRouter({ routeTree });

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
          req.url = req.url.replace("s?", `apikey=${import.meta.env.VITE_API_KEY}&`);
          req.options.headers = {};
          return req;
        },
      },
    ],
  });
  useEffect(() => {
    getS("batman").then(console.log);
  }, []);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
