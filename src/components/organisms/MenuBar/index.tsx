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
  FlexColumn,
  FlexJustifyContent
} from '@project/components/atoms/Flex';
import { Avatar } from '@project/components/molecules/Avatar';
import { LogoIcon } from '@project/components/atoms/Icon';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { Navigation } from '@project/components/molecules/Navigation';
import { ProgressAPI } from '@project/containers/ProgressAPI';
import { Span, styles } from './styles';

export interface MenuBarProps {
  avatar: string;
  className: string;
}

const Component: FunctionComponent<MenuBarProps> = ({
  avatar,
  className
}: MenuBarProps) => {
  return (
    <header className={className}>
      <Wrapper padding>
        <Flex justifyContent={FlexJustifyContent.SPACE_BETWEEN}>
          <FlexColumn>
            <LogoIcon /> <Span>Planner</Span>
          </FlexColumn>
          <FlexColumn>
            <Link href="/profile" passHref>
              <Avatar image={avatar} />
            </Link>
          </FlexColumn>
        </Flex>
      </Wrapper>
      <Navigation />
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
