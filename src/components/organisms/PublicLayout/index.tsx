/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { Breakpoints } from '@project/types';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { LogoIcon } from '@project/components/atoms/Icon';
import {
  Heading,
  HeadingSize,
  HeadingTag
} from '@project/components/atoms/Heading';
import { Wrapper, WrapperSpacing } from '@project/components/atoms/Wrapper';
import {
  Flex,
  FlexColumn,
  FlexAlignItems
} from '@project/components/atoms/Flex';
import { styles } from './styles';

export interface PublicLayoutProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Component: FunctionComponent<PublicLayoutProps> = ({
  children,
  className
}: PublicLayoutProps) => {
  return (
    <div className={className}>
      <Wrapper tag="header" spacing={WrapperSpacing.LARGE} centered>
        <Wrapper constraint={Breakpoints.TINY} centered>
          <Flex alignItems={FlexAlignItems.CENTER}>
            <FlexColumn>
              <LogoIcon />
            </FlexColumn>
            <FlexColumn>
              <Heading size={HeadingSize.SUPER} tag={HeadingTag.H1}>
                Planner
              </Heading>
            </FlexColumn>
          </Flex>
        </Wrapper>
      </Wrapper>
      <Wrapper constraint={Breakpoints.TINY} centered>
        <main>{children}</main>
      </Wrapper>
    </div>
  );
};

export const PublicLayout = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('PublicLayout')
)(Component);
