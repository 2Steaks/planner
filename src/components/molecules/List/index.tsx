/** @format */

import React, { FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withMappedProps, withStyle } from '@project/helpers';
import {
  Flex,
  FlexColumn,
  FlexDirection
} from '@project/components/atoms/Flex';
import { listItemStyle, listStyle } from './styles';

export enum ListVariant {
  NONE = 'NONE',
  UNDERLINE = 'UNDERLINE'
}

export interface ListProps {
  children: ReactNode | ReactNode[] | JSX.Element;
  className?: string;
  inline?: boolean;
}

export interface ListItemProps {
  children: ReactNode | ReactNode[];
  className?: string;
}

export interface ListComposition {
  Item: FunctionComponent<ListItemProps>;
}

/**
 *
 * @param param0
 */
const Container: FunctionComponent<ListProps> = ({
  children,
  ...props
}: ListProps) => {
  return (
    <Flex tag="ul" {...props}>
      {children}
    </Flex>
  );
};

/**
 *
 * @param param0
 */
const Item: FunctionComponent<ListItemProps> = ({
  children,
  ...props
}: ListItemProps) => {
  return (
    <FlexColumn tag="li" {...props}>
      {children}
    </FlexColumn>
  );
};

const computed = (props: ListProps) => {
  const direction = props.inline ? FlexDirection.ROW : FlexDirection.COLUMN;

  return {
    ...props,
    direction
  };
};

export const List = compose(
  withStyle(listStyle, ['inline']),
  withMappedProps(computed),
  withDisplayName('List')
)(Container);

export const ListItem = compose(
  withStyle(listItemStyle),
  withDisplayName('ListItem')
)(Item);
