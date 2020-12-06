/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { Breakpoints } from '@project/types';
import { withDisplayName, withLogging, withStyle } from '@project/helpers';
import { Drawer, DrawerPosition } from '@project/components/atoms/Drawer';
import { MenuBar } from '@project/containers/MenuBar';
import { Wrapper } from '@project/components/atoms/Wrapper';
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
      <Drawer position={DrawerPosition.TOP} sticky>
        <MenuBar />
      </Drawer>
      <Wrapper tag="main" constraint={Breakpoints.LARGE} padding centered>
        {children}
      </Wrapper>
    </div>
  );
};

export const PublicLayout = compose(
  withStyle(styles),
  withLogging(false),
  withDisplayName('PublicLayout')
)(Component);
