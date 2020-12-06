/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { Breakpoints } from '@project/types';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { useMediaQuery } from '@project/hooks';
import { Drawer, DrawerPosition } from '@project/components/atoms/Drawer';
import { MenuBar } from '@project/containers/MenuBar';
import { MobileMenuBar } from '@project/components/organisms/MobileMenuBar';
import { OnlineStatus } from '@project/components/molecules/OnlineStatus';
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
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);

  return (
    <div className={className}>
      <Drawer position={DrawerPosition.TOP} sticky>
        <When condition={!isTablet}>
          <MenuBar />
        </When>
        <OnlineStatus />
      </Drawer>
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
