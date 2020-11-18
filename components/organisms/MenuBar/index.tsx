/** @format */

import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { compose } from 'ramda';
import {
  withDisplayName,
  withStyle,
  withLogging,
  withRef
} from '@project/helpers';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { Image } from '@project/components/atoms/Image';
import { MealPlanIcon } from '@project/components/atoms/Icon';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { When } from '@project/components/atoms/When';
import { Navigation } from '@project/components/molecules/Navigation';
import { ProgressAPI } from '@project/containers/ProgressAPI';
import { Span, styles } from './styles';

export interface MenuBarProps {
  avatar: string;
  className: string;
  isAuthenticated: boolean;
}

const Component: FunctionComponent<MenuBarProps> = ({
  avatar = '/img/default-avatar.png',
  className,
  isAuthenticated
}: MenuBarProps) => {
  return (
    <header className={className}>
      <Wrapper padding>
        <Flex justifyContent="space-between">
          <FlexColumn>
            <Link href="/">
              <a>
                <MealPlanIcon /> <Span>Planner</Span>
              </a>
            </Link>
          </FlexColumn>
          <When condition={isAuthenticated}>
            <FlexColumn>
              <Link href="/profile">
                <a>
                  <Image src={avatar} />
                </a>
              </Link>
            </FlexColumn>
          </When>
        </Flex>
      </Wrapper>
      <Navigation isAuthenticated={isAuthenticated} />
      <ProgressAPI />
    </header>
  );
};

export const MenuBar = compose(
  withStyle(styles, ['avatar', 'isAuthenticated']),
  withRef,
  withLogging(false),
  withDisplayName('Button')
)(Component);
