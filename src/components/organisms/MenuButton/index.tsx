/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { gutter } from '@project/theme';
import { Breakpoints } from '@project/types';
import { useMediaQuery } from '@project/hooks';
import { Button } from '@project/components/atoms/Button';
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

export const MenuListButton = styled(Button)`
  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: calc(${gutter} / 2);
  }

  & > * {
    vertical-align: middle;
    margin-right: 5px;
  }
`;
