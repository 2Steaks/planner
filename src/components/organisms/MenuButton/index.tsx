/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { Breakpoints } from '@project/types';
import { useMediaQuery } from '@project/hooks';
import { DesktopMenuButton } from '@project/components/molecules/DesktopMenuButton';
import { MobileMenuButton } from '@project/components/molecules/MobileMenuButton';

export interface MenuButtonProps {
  children: ReactNode | ReactNode[];
}

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
  children,
  ...props
}: MenuButtonProps) => {
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);
  const Component = isTablet ? MobileMenuButton : DesktopMenuButton;

  return (
    <Component isTablet={isTablet} {...props}>
      {children}
    </Component>
  );
};
