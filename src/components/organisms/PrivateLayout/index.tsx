/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose, prop } from 'ramda';
import { Breakpoints } from '@project/types';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { useMediaQuery } from '@project/hooks';
import { useAuth } from '@project/context';
import { Drawer, DrawerPosition } from '@project/components/atoms/Drawer';
import { MenuBar } from '@project/components/organisms/MenuBar';
import { MobileMenuBar } from '@project/components/organisms/MobileMenuBar';
import { ProgressAPI } from '@project/containers/ProgressAPI';
import { When } from '@project/components/atoms/When';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { styles } from './styles';

export interface PrivateLayoutProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Component: FunctionComponent<PrivateLayoutProps> = ({
  children,
  className
}: PrivateLayoutProps) => {
  const { user } = useAuth() as any;
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);

  return (
    <div className={className}>
      <When condition={!isTablet}>
        <Drawer position={DrawerPosition.TOP} sticky>
          <MenuBar avatar={prop('avatar', user)} />
        </Drawer>
      </When>
      <When condition={isTablet}>
        <ProgressAPI />
      </When>
      <Wrapper tag="main" constraint={Breakpoints.LARGE} padding centered>
        {children}
      </Wrapper>
      <When condition={isTablet}>
        <Drawer position={DrawerPosition.BOTTOM} sticky>
          <MobileMenuBar />
        </Drawer>
      </When>
    </div>
  );
};

export const PrivateLayout = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('PrivateLayout')
)(Component);
