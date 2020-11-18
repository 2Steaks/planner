/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { Progress } from '@project/components/molecules/Progress';
import { getCalorieColor } from './model';

export interface ProgressCaloriesProps {
  children: ReactNode | ReactNode[];
  value: number;
}

export const ProgressCalories: FunctionComponent<ProgressCaloriesProps> = ({
  children,
  value
}: ProgressCaloriesProps) => {
  return (
    <Progress color={getCalorieColor(value)} value={value}>
      {children}
    </Progress>
  );
};
