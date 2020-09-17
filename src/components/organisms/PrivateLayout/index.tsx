/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { Breakpoints } from '@project/types';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { Drawer, DrawerPosition } from '@project/components/atoms/Drawer';
import { Wrapper } from '@project/components/atoms/Wrapper';
import { MenuBar } from '@project/containers/MenuBar';
import { styles } from './styles';

export interface PrivateLayoutProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Component: FunctionComponent<PrivateLayoutProps> = ({
  children,
  className
}: PrivateLayoutProps) => {
  return (
    <div className={className}>
      <Drawer position={DrawerPosition.TOP} sticky>
        <MenuBar />
      </Drawer>
      <Wrapper tag="main" constraint={Breakpoints.LARGE} padding centered>
        {children}
      </Wrapper>
    </div>
  );
};

export const PrivateLayout = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('PrivateLayout')
)(Component);
