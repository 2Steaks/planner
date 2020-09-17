/** @format */

import { MouseEvent } from 'react';

export interface IconProps {
  /**
   * Custom className
   */
  className?: string;

  onClick?: (event: MouseEvent<HTMLOrSVGElement>) => void;
}
