import React, { Suspense} from "react";

const defaultFallback = <div>Loading...</div>;

export default (LazyComponent, fallback = defaultFallback) => () => (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );