/** @format */

import React, { forwardRef, FunctionComponent } from 'react';
import { getDisplayName } from '@project/services';

/**
 *
 * @param Component
 */
export const withRef = (Component: FunctionComponent<any>) => {
  const Wrapped = forwardRef((props, ref) => {
    return <Component {...props} forwardRef={ref} />;
  });

  Wrapped.displayName = `withRef(${getDisplayName(Component)})`;
  return Wrapped;
};
