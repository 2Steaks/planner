/** @format */

import React, { FunctionComponent } from 'react';
import { compose } from 'ramda';
import {
  withDisplayName,
  withStyle,
  withLogging,
  withRef
} from '@project/helpers';
import { MobileNavigation } from '@project/components/molecules/MobileNavigation';
import { styles } from './styles';

export interface MobileMenuBarProps {
  avatar: string;
  className: string;
  isAuthenticated: boolean;
}

const Component: FunctionComponent<MobileMenuBarProps> = ({
  className
}: MobileMenuBarProps) => {
  return (
    <div className={className}>
      <MobileNavigation />
    </div>
  );
};

export const MobileMenuBar = compose(
  withStyle(styles),
  withRef,
  withLogging(false),
  withDisplayName('MobileMenuBar')
)(Component);
