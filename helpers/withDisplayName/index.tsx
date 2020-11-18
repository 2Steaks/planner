/** @format */

import React, { FunctionComponent } from 'react';

/**
 * @format
 * @param Component
 */

export const withDisplayName = (displayName: string) => (
  Component: FunctionComponent<any>
) => {
  function Wrapped(props: any) {
    return <Component {...props} />;
  }

  Wrapped.displayName = displayName;
  return Wrapped;
};
