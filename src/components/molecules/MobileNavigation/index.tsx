/** @format */

import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { compose } from 'ramda';
import { isRoute } from '@project/services';
import { withDisplayName, withStyle } from '@project/helpers';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import {
  CalendarIcon,
  HistoryIcon,
  HomeIcon,
  RecipeIcon
} from '@project/components/atoms/Icon';
import { Anchor, styles } from './styles';

export interface MobileNavigationProps {
  className: string;
}

const Component: FunctionComponent<MobileNavigationProps> = ({
  className
}: MobileNavigationProps) => {
  const router = useRouter();

  return (
    <nav className={className}>
      <Flex spacing={0}>
        <FlexColumn grow={1}>
          <Link href="/">
            <Anchor isActive={isRoute('/')(router.route)}>
              <HomeIcon />
            </Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn grow={1}>
          <Link href="/recipes">
            <Anchor isActive={isRoute('/recipes')(router.route)}>
              <RecipeIcon />
            </Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn grow={1}>
          <Link href="/plan">
            <Anchor isActive={isRoute('/plan')(router.route)}>
              <CalendarIcon />
            </Anchor>
          </Link>
        </FlexColumn>
        <FlexColumn grow={1}>
          <Link href="/history">
            <Anchor isActive={isRoute('/history')(router.route)}>
              <HistoryIcon />
            </Anchor>
          </Link>
        </FlexColumn>
      </Flex>
    </nav>
  );
};

export const MobileNavigation = compose(
  withStyle(styles),
  withDisplayName('MobileNavigation')
)(Component);
