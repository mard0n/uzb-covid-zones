import React from "react";

export const lazyPreload = (
  factory: () => Promise<{ default: React.SFC<any> }>
) => {
  const Component: any = React.lazy(factory);
  Component.preload = factory;
  return Component;
};
