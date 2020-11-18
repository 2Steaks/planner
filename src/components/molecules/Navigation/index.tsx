/** @format */

import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { compose } from 'ramda';
import { isRoute } from '@project/services';
import { withDisplayName, withStyle } from '@project/helpers';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { Anchor, styles } from './styles';

export interface NavigationProps {
  className: string;
}

const Component: FunctionComponent<NavigationProps> = ({
  className
}: NavigationProps) => {
  const router = useRouter();

  return (
    <nav className={className}>
      <Flex spacing={0}>
        <FlexColumn>
          <Link href="/">
            <Anchor isActive={isRoute('/')(router.route)}>Home</Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn>
          <Link href="/recipes">
            <Anchor isActive={isRoute('/recipes')(router.route)}>
              Recipes
            </Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn>
          <Link href="/plan">
            <Anchor isActive={isRoute('/plan')(router.route)}>Plan</Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn>
          <Link href="/history">
            <Anchor isActive={isRoute('/history')(router.route)}>
              History
            </Anchor>
          </Link>
        </FlexColumn>
      </Flex>
    </nav>
  );
};

export const Navigation = compose(
  withStyle(styles, ['isAuthenticated']),
  withDisplayName('Navigation')
)(Component);
