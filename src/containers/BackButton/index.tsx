/** @format */

import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { BackArrowIcon } from '@project/components/atoms/Icon/BackArrow';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { styles } from './styles';

export interface BackButtonProps {
  className: string;
  url?: string;
}
const Component: FunctionComponent<BackButtonProps> = ({
  className,
  url
}: BackButtonProps) => {
  const router = useRouter();

  function handleButtonClick() {
    if (url) {
      router.push(url);
      return;
    }

    router.back();
  }

  return (
    <Button
      className={className}
      onClick={handleButtonClick}
      variant={ButtonVariant.NONE}
    >
      <BackArrowIcon />
    </Button>
  );
};

export const BackButton = compose(
  withStyle(styles),
  withDisplayName('BackButton')
)(Component);
