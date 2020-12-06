/** @format */

import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { ArrowLeftIcon } from '@project/components/atoms/Icon/ArrowLeft';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { styles } from './styles';

export interface BackButtonProps {
  className: string;
}
const Component: FunctionComponent<BackButtonProps> = ({
  className
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={router.back}
      variant={ButtonVariant.NONE}
    >
      <ArrowLeftIcon />
    </Button>
  );
};

export const BackButton = compose(
  withStyle(styles),
  withDisplayName('BackButton')
)(Component);
