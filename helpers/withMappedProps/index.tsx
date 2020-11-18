/** @format */

import React from 'react';
import { curry } from 'ramda';
import { getDisplayName } from '@project/services';

export const withMappedProps = curry((fn, Component) => {
  function Wrapped(props: any) {
    return <Component {...fn(props)} />;
  }

  Wrapped.displayName = `withMappedProps(${getDisplayName(Component)})`;
  return Wrapped;
});
