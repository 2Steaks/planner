/** @format */

import React, { FunctionComponent } from 'react';
import { getDisplayName } from '@project/services';

/**
 *
 * @param Component
 */
export const withLogging = (isActive = false) => (
  Component: FunctionComponent<any>
) => {
  const displayName = getDisplayName(Component);

  function Wrapped(props: any) {
    if (isActive) {
      console.groupCollapsed(`Logging ${displayName} props`);
      console.table(props);
      console.groupEnd();
    }

    return <Component {...props} />;
  }

  Wrapped.displayName = `withLogging(${displayName})`;
  return Wrapped;
};
