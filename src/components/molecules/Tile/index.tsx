/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { Button, ButtonVariant } from '@project/components/atoms/Button';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import {
  TrashIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon
} from '@project/components/atoms/Icon';
import { When } from '@project/components/atoms/When';
import { Actions, Body, Container } from './styles';

export interface TileProps {
  children: ReactNode | ReactNode[];
  disabled?: boolean;
  id: string;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onLink: (id: string) => void;
}

export const Tile: FunctionComponent<TileProps> = ({
  children,
  id,
  onClick,
  onDelete,
  onLink
}: TileProps) => {
  const hasContent = Boolean(id);

  function handleClick() {
    onClick(id);
  }

  function handleLink() {
    onLink(id);
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <Container>
      <When condition={!hasContent}>
        <Body onClick={handleClick}>
          <PlusIcon />
        </Body>
      </When>
      <When condition={hasContent}>
        <Body>
          <Actions>
            <Flex>
              <FlexColumn>
                <Button variant={ButtonVariant.NONE} onClick={handleLink}>
                  <EyeIcon />
                </Button>
              </FlexColumn>
              <FlexColumn>
                <Button variant={ButtonVariant.NONE} onClick={handleClick}>
                  <PencilIcon />
                </Button>
              </FlexColumn>
              <FlexColumn>
                <Button variant={ButtonVariant.NONE} onClick={handleDelete}>
                  <TrashIcon />
                </Button>
              </FlexColumn>
            </Flex>
          </Actions>
          {children}
        </Body>
      </When>
    </Container>
  );
};
