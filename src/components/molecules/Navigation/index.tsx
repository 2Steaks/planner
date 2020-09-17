/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { compose } from 'ramda';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { When } from '@project/components/atoms/When';
import { withDisplayName, withStyle } from '@project/helpers';
import { Anchor, styles } from './styles';

export interface NavigationProps {
  className: string;
  isAuthenticated: boolean;
}

const Component: FunctionComponent<NavigationProps> = ({
  className,
  isAuthenticated
}: NavigationProps) => {
  return (
    <nav className={className}>
      <When condition={isAuthenticated}>
        <Flex spacing={0}>
          <FlexColumn>
            <Link href="/history">
              <Anchor>History</Anchor>
            </Link>
          </FlexColumn>
          <FlexColumn>
            <Link href="/plan/today">
              <Anchor>Plan</Anchor>
            </Link>
          </FlexColumn>
        </Flex>
      </When>
    </nav>
  );
};

export const Navigation = compose(
  withStyle(styles, ['isAuthenticated']),
  withDisplayName('Navigation')
)(Component);
