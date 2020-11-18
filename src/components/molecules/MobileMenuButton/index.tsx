/** @format */

import React, {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react';
import { compose } from 'ramda';
import { useSpring, useTransition } from 'react-spring';
import { isDefined } from '@project/services';
import { withDisplayName, withStyle } from '@project/helpers';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { MenuIcon } from '@project/components/atoms/Icon/Menu';
import { Portal } from '@project/components/atoms/Portal';
import {
  Body,
  Container,
  Window,
  containerAnimConfig,
  windowAnimConfig,
  styles
} from './styles';

export interface MobileMenuButtonContext {
  onClose: () => void;
}

export interface MobileMenuButtonProps {
  children: ReactNode | ReactNode[];
  className: string;
}

const Context = createContext<Partial<MobileMenuButtonContext>>({});

const Component: FunctionComponent<MobileMenuButtonProps> = ({
  children,
  className
}: MobileMenuButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const transitions = useTransition(isOpen, null, containerAnimConfig);
  const windowAnimation = useSpring(windowAnimConfig({ isOpen }));

  const context = {
    onClose: handleMenuClose
  };

  function handleButtonClick() {
    setIsOpen((bool) => !bool);
  }

  function handleMenuClose() {
    setIsOpen(false);
  }

  return (
    <div className={className}>
      <Button onClick={handleButtonClick} variant={ButtonVariant.NONE}>
        <MenuIcon />
      </Button>
      {transitions.map(({ item, props, key }) => (
        <Portal key={key} isDisabled={!item}>
          <Container style={props}>
            <Window style={windowAnimation}>
              <Button onClick={handleMenuClose} variant={ButtonVariant.NONE}>
                Close
              </Button>
              <Body>
                <Context.Provider value={context}>{children}</Context.Provider>
              </Body>
            </Window>
          </Container>
        </Portal>
      ))}
    </div>
  );
};

export const MobileMenuButton = compose(
  withStyle(styles, ['placement']),
  withDisplayName('MobileMenuButton')
)(Component);

export const useMobileMenuButton = () => {
  const state = useContext(Context);

  if (!isDefined(state)) {
    throw new Error(
      'useMobileMenuButton must be used within a MobileMenuButtonProvider'
    );
  }

  return state;
};
