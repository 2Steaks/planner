/** @format */

import React, { FunctionComponent } from 'react';
import { getDisplayName } from '@project/services';
import { ErrorBoundary } from '@project/components/atoms/ErrorBoundary';

/**
 *
 * @param Component
 */
export const withErrorBoundary = (errorProps?: any) => (
  Component: FunctionComponent<any>
) => {
  const Backup = () => <div>Oh bother!</div>;
  const newProps = { ...errorProps, fallback: Backup };

  function Wrapped(props: any) {
    return (
      <ErrorBoundary {...newProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  }

  // Format for display in DevTools
  Wrapped.displayName = `withErrorBoundary(${getDisplayName(Component)})`;
  return Wrapped;
};
