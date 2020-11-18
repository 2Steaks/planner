/** @format */

import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';
import { StyledComponent } from '@emotion/styled';
import { compose } from 'ramda';
import { IconProps } from '@project/types';
import {
  withDisplayName,
  withMappedProps,
  withStyle,
  withLogging
} from '@project/helpers';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import {
  CrossIcon,
  InfoIcon,
  ExclamationIcon,
  QuestionMarkIcon,
  TickIcon
} from '@project/components/atoms/Icon';
import { Circle, styles } from './styles';

export enum AlertVariant {
  ERROR,
  INFO,
  STANDARD,
  SUCCESS,
  WARNING
}

export interface AlertProps {
  children: ReactNode | ReactNode[];
  className?: string;
  icon: StyledComponent<
    IconProps,
    Pick<IconProps, 'className'>,
    Record<string, unknown>
  >;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  variant: AlertVariant;
}

const AlertIcon = {
  [AlertVariant.ERROR]: CrossIcon,
  [AlertVariant.INFO]: InfoIcon,
  [AlertVariant.STANDARD]: QuestionMarkIcon,
  [AlertVariant.SUCCESS]: TickIcon,
  [AlertVariant.WARNING]: ExclamationIcon
};

const Component: FunctionComponent<AlertProps> = ({
  children,
  icon: Icon,
  ...props
}: AlertProps) => {
  return (
    <div {...props}>
      <Flex spacing={3}>
        <FlexColumn>
          <Circle>
            <Icon />
          </Circle>
        </FlexColumn>
        <FlexColumn grow={1}>{children}</FlexColumn>
      </Flex>
    </div>
  );
};

/**
 * With computed properties
 */
const computed = (props: AlertProps) => {
  const variant = props.variant || AlertVariant.STANDARD;

  return {
    ...props,
    icon: AlertIcon[variant],
    variant
  };
};

export const Alert = compose(
  withStyle(compose(styles, computed), ['variant']),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Alert')
)(Component);
