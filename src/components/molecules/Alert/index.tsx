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

export enum AlertTheme {
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
  theme: AlertTheme;
}

const AlertIcon = {
  [AlertTheme.ERROR]: CrossIcon,
  [AlertTheme.INFO]: InfoIcon,
  [AlertTheme.STANDARD]: QuestionMarkIcon,
  [AlertTheme.SUCCESS]: TickIcon,
  [AlertTheme.WARNING]: ExclamationIcon
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
  const theme = props.theme || AlertTheme.STANDARD;

  return {
    ...props,
    icon: AlertIcon[theme],
    theme
  };
};

export const Alert = compose(
  withStyle(compose(styles, computed), ['theme']),
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Alert')
)(Component);
