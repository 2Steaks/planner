/** @format */

import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useSpring } from 'react-spring';
import { Button } from '@project/components/atoms/Button';
import { Heading, HeadingTag } from '@project/components/atoms/Heading';
import { Portal } from '@project/components/atoms/Portal';
import { Progress } from '@project/components/molecules/Progress';
import {
  Body,
  Container,
  Footer,
  Header,
  Window,
  containerAnimConfig,
  windowAnimConfig
} from './styles';

export interface ModalProps {
  children: ReactNode | ReactNode[];
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  title?: string;
}

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  isActive = false,
  isDisabled = false,
  isLoading = false,
  onClose,
  title
}: ModalProps) => {
  const [active, setActive] = useState(isActive);

  const containerAnimation = useSpring(
    containerAnimConfig({
      isActive,
      onStart: () => isActive && setActive(true),
      onRest: () => !isActive && setActive(false)
    })
  );

  const windowAnimation = useSpring(windowAnimConfig({ isActive }));

  return (
    <Portal isDisabled={!active}>
      <Container style={containerAnimation}>
        <Window style={windowAnimation}>
          <Progress isLoading={isLoading} />
          <Header>
            <Heading tag={HeadingTag.H3}>{title}</Heading>
          </Header>
          <Body>{children}</Body>
          <Footer>
            <ul>
              <li>
                <Button disabled={isDisabled} onClick={onClose}>
                  Close
                </Button>
              </li>
            </ul>
          </Footer>
        </Window>
      </Container>
    </Portal>
  );
};
