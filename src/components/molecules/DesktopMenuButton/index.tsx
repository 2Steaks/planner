/** @format */

import React, { FunctionComponent, ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { compose } from 'ramda';
import { animated, useTransition } from 'react-spring';
import { withDisplayName, withStyle } from '@project/helpers';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { ClickAwayListener } from '@project/components/atoms/ClickAwayListener';
import { Menu } from '@project/components/atoms/Menu';
import { MenuIcon } from '@project/components/atoms/Icon/Menu';
import { Hidden } from '@project/components/atoms/Hidden';
import { menuAnimConfig, styles } from './styles';

export enum MenuButtonPlacement {
  AUTO = 'auto',
  AUTO_START = 'auto-start',
  AUTO_END = 'auto-end',
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  RIGHT = 'right',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end'
}

export interface DesktopMenuButtonProps {
  children: ReactNode | ReactNode[];
  className: string;
  placement: MenuButtonPlacement;
}

const Component: FunctionComponent<DesktopMenuButtonProps> = ({
  children,
  className,
  placement = MenuButtonPlacement.BOTTOM_END
}: DesktopMenuButtonProps) => {
  const [sourceElement, setButtonElement] = useState<null | HTMLElement>(null);
  const [targetElement, setMenuElement] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const transitions = useTransition(isOpen, null, menuAnimConfig);
  const { styles, attributes } = usePopper(sourceElement, targetElement, {
    placement
  });

  function handleButtonClick() {
    setIsOpen((bool) => !bool);
  }

  function handleAwayClick() {
    setIsOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={handleAwayClick}>
      <div className={className}>
        <Button
          ref={setButtonElement}
          onClick={handleButtonClick}
          variant={ButtonVariant.NONE}
        >
          <MenuIcon />
        </Button>
        {transitions.map(({ item, props, key }) => (
          <Hidden
            key={key}
            unless={item}
            ref={setMenuElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu style={props} tag={animated.div}>
              {children}
            </Menu>
          </Hidden>
        ))}
      </div>
    </ClickAwayListener>
  );
};

export const DesktopMenuButton = compose(
  withStyle(styles, ['placement']),
  withDisplayName('DesktopMenuButton')
)(Component);
