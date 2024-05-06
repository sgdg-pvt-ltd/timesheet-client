import React from "react";
import { useRoutes } from "react-router-dom";
import Loader from "~/components/loader";

import { ROUTES } from "~/config";
import { IndexLayout } from "~/components/layouts";

function AppRouter() {
  const Routes = useRoutes(ROUTES);
  return (
    <React.Suspense fallback={<Loader />}>
      <IndexLayout>{Routes}</IndexLayout>
    </React.Suspense>
  );
}

export default AppRouter;
