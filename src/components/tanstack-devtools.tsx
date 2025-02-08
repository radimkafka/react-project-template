import React, { lazy, Suspense, useState } from "react";

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

const TanstackRouterDevtoolsProduction = lazy(() =>
  import("@tanstack/router-devtools").then((res) => ({
    default: res.TanStackRouterDevtools,
  })),
);

const TanstackDevtools = () => {
  const [showDevtools, setShowDevtools] = useState(import.meta.env.DEV);

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    showDevtools && (
      <Suspense>
        <ReactQueryDevtoolsProduction buttonPosition="top-right" position="bottom" />
        <TanstackRouterDevtoolsProduction position="top-right" />
      </Suspense>
    )
  );
};

export default TanstackDevtools;
