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
import {
  Flex,
  FlexAlignItems,
  FlexColumn,
  FlexJustifyContent
} from '@project/components/atoms/Flex';
import { Avatar } from '@project/components/molecules/Avatar';
import { LogoIcon } from '@project/components/atoms/Icon';
import { Navigation } from '@project/components/molecules/Navigation';
import { ProgressAPI } from '@project/containers/ProgressAPI';
import { When } from '@project/components/atoms/When';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { Anchor, Span, styles } from './styles';

export interface MenuBarProps {
  avatar: string;
  className: string;
  isAuthenticated: boolean;
}

const Component: FunctionComponent<MenuBarProps> = ({
  avatar,
  className,
  isAuthenticated = false
}: MenuBarProps) => {
  return (
    <header className={className}>
      <Wrapper padding>
        <Flex
          alignItems={FlexAlignItems.CENTER}
          justifyContent={FlexJustifyContent.SPACE_BETWEEN}
        >
          <FlexColumn>
            <Link href="/" passHref>
              <a>
                <LogoIcon /> <Span>Planner</Span>
              </a>
            </Link>
          </FlexColumn>
          <When condition={isAuthenticated}>
            <FlexColumn>
              <Link href="/profile" passHref>
                <Avatar image={avatar} />
              </Link>
            </FlexColumn>
          </When>
          <When condition={!isAuthenticated}>
            <FlexColumn>
              <Link href="/plan" passHref>
                <Anchor>Login</Anchor>
              </Link>
            </FlexColumn>
          </When>
        </Flex>
      </Wrapper>
      <When condition={isAuthenticated}>
        <Navigation />
      </When>
      <ProgressAPI />
    </header>
  );
};

export const MenuBar = compose(
  withStyle(styles, ['avatar', 'isAuthenticated']),
  withRef,
  withLogging(false),
  withDisplayName('MenuBar')
)(Component);
