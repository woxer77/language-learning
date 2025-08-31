import React, { ComponentType } from 'react';

import Loading from "../../components/UI/Loading/Loading";

const useLazy = (dynamicImport: () => Promise<{   default: ComponentType<any>; }>) => {
  const LazyComponent = React.lazy(dynamicImport);

  return (props: any) => (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

export default useLazy;
