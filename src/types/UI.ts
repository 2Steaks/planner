/** @format */

import { ReactNode } from 'react';
import { StyledComponent } from '@emotion/styled';

export enum Breakpoints {
  NONE = 'auto',
  TINY = '320px',
  SMALL = '768px',
  MEDIUM = '992px',
  LARGE = '1200px'
}

export type ChildrenType = { children?: ReactNode | ReactNode[] };

export type StyledComponentWithProps<T> = StyledComponent<
  T,
  T,
  Record<string, unknown>
>;
