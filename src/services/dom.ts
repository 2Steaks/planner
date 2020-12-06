/** @format */

import { FunctionComponent } from 'react';

export const ownerDocument = (node: Node | undefined): Document => {
  return (node && node.ownerDocument) || document;
};

export const getDisplayName = (Component: FunctionComponent<any>) =>
  Component.displayName || Component.name || 'Component';

export const hasHistory = () =>
  typeof window !== 'undefined' && window.history.length > 0;
