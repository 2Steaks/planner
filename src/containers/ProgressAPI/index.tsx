/** @format */

import React, { FunctionComponent } from 'react';
import { useIsFetching } from 'react-query';
import { compose, gt } from 'ramda';
import { withDisplayName } from '@project/helpers/withDisplayName';
import { withStyle } from '@project/helpers/withStyle';
import { Progress } from '@project/components/molecules/Progress';
import { When } from '@project/components/atoms/When';
import { styles } from './styles';

export interface ProgressAPIProps {
  className?: string;
}

const Component: FunctionComponent<ProgressAPIProps> = ({
  className
}: ProgressAPIProps) => {
  const isFetching = useIsFetching();

  return (
    <When condition={gt(isFetching, 0)}>
      <Progress className={className} />
    </When>
  );
};

export const ProgressAPI = compose(
  withStyle(styles),
  withDisplayName('ProgressAPI')
)(Component);
