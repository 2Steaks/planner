/** @format */

import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useSpring, useTransition } from 'react-spring';
import { Breakpoints } from '@project/types';
import { isDefined } from '@project/services';
import { useMediaQuery } from '@project/hooks';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { ClickAwayListener } from '@project/components/atoms/ClickAwayListener';
import {
  Flex,
  FlexAlignItems,
  FlexColumn
} from '@project/components/atoms/Flex';
import { Heading, HeadingTag } from '@project/components/atoms/Heading';
import { CrossIcon } from '@project/components/atoms/Icon';
import { Portal } from '@project/components/atoms/Portal';
import { Progress } from '@project/components/molecules/Progress';
import { When } from '@project/components/atoms/When';
import {
  Body,
  Container,
  Header,
  Window,
  containerAnimConfig,
  windowAnimConfig
} from './styles';

export interface ModalContextProps {
  isLoading: boolean;
  setLoading: (x: boolean) => void;
}

export interface ModalProps {
  children: ReactNode | ReactNode[];
  isActive?: boolean;
  isDisabled?: boolean;
  onClose: (event: MouseEvent<Document | HTMLButtonElement>) => void;
  title?: string;
}

const Context = createContext<Partial<ModalContextProps>>({});

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  isActive = false,
  isDisabled = false,
  onClose,
  title
}: ModalProps) => {
  const isTablet = useMediaQuery(`(max-width:${Breakpoints.SMALL})`);
  const transitions = useTransition(isActive, null, containerAnimConfig);
  const windowAnimation = useSpring(windowAnimConfig({ isActive, isTablet }));
  const [loading, setLoading] = useState(false);

  const context = {
    isLoading: loading,
    setLoading,
    onClose
  };

  useEffect(() => {
    !isActive && setLoading(false);
  }, [isActive]);

  return (
    <Fragment>
      {transitions.map(({ item, props, key }) => (
        <Portal key={key} isDisabled={!item}>
          <ClickAwayListener onClickAway={onClose}>
            <Container style={props}>
              <Window style={windowAnimation}>
                <When condition={loading}>
                  <Progress />
                </When>
                <Header>
                  <Flex alignItems={FlexAlignItems.CENTER}>
                    <FlexColumn grow={1}>
                      <Heading tag={HeadingTag.H3}>{title}</Heading>
                    </FlexColumn>
                    <FlexColumn>
                      <Button
                        disabled={isDisabled}
                        variant={ButtonVariant.NONE}
                        onClick={onClose}
                      >
                        <CrossIcon size={1.8} />
                      </Button>
                    </FlexColumn>
                  </Flex>
                </Header>
                <Body>
                  <Context.Provider value={context}>
                    {children}
                  </Context.Provider>
                </Body>
              </Window>
            </Container>
          </ClickAwayListener>
        </Portal>
      ))}
    </Fragment>
  );
};

export const useModal = () => {
  const state = useContext(Context);

  if (!isDefined(state)) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return state;
};
