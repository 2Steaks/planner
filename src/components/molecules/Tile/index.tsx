/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { Button, ButtonTheme } from '@project/components/atoms/Button';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import {
  CrossIcon,
  LinkIcon,
  PencilIcon,
  PlusIcon
} from '@project/components/atoms/Icon';
import { When } from '@project/components/atoms/When';
import { Actions, Body, Container } from './styles';

export interface TileProps {
  children: ReactNode | ReactNode[];
  disabled?: boolean;
  id: string;
  onDelete: (id: string) => void;
  onAdd: (id: string) => void;
  onLink?: (id: string) => void;
}

export const Tile: FunctionComponent<TileProps> = ({
  children,
  disabled,
  id,
  onAdd,
  onDelete,
  onLink
}: TileProps) => {
  const hasContent = Boolean(id);

  function handleAdd() {
    onAdd(id);
  }

  function handleDelete() {
    onDelete(id);
  }

  function handleLink() {
    onLink && onLink(id);
  }

  return (
    <Container>
      <When condition={!hasContent}>
        <Body onClick={handleAdd}>
          <PlusIcon />
        </Body>
      </When>
      <When condition={hasContent}>
        <Body>{children}</Body>
        <Actions disabled={disabled}>
          <Flex alignItems="center" justifyContent="center">
            <FlexColumn>
              <When condition={!disabled && Boolean(onLink)}>
                <Button theme={ButtonTheme.NONE} onClick={handleLink}>
                  <LinkIcon />
                </Button>
              </When>
            </FlexColumn>
            <FlexColumn>
              <When condition={!disabled && Boolean(onAdd)}>
                <Button theme={ButtonTheme.NONE} onClick={handleAdd}>
                  <PencilIcon />
                </Button>
              </When>
            </FlexColumn>
            <FlexColumn>
              <When condition={!disabled && Boolean(onDelete)}>
                <Button theme={ButtonTheme.NONE} onClick={handleDelete}>
                  <CrossIcon />
                </Button>
              </When>
            </FlexColumn>
          </Flex>
        </Actions>
      </When>
    </Container>
  );
};
