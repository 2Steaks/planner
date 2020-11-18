/** @format */

import React, { Children, FunctionComponent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { List, ListItem } from '@project/components/molecules/List';
import { Wrapper, WrapperSpacing } from '@project/components/atoms/Wrapper';
import { containerStyles } from './styles';

export interface TabsProps {
  children: ReactNode | ReactNode[];
  onChange: (index: number) => void;
  value: number;
}
export interface TabProps {
  children: ReactNode;
  index: number;
  label: string;
}

export const Tab: FunctionComponent<TabProps> = ({
  children,
  ...props
}: TabProps) => {
  return <div {...props}>{children}</div>;
};

export const TabsComponent: FunctionComponent<TabsProps> = ({
  children,
  onChange,
  value,
  ...props
}: TabsProps) => {
  const list = Children.toArray(children);
  const tab = list[value];

  function handleChange(index: number) {
    return function () {
      onChange(index);
    };
  }

  return (
    <div {...props}>
      <Wrapper spacing={WrapperSpacing.SMALL}>
        <List inline>
          {list.map(({ props }: any) => (
            <ListItem key={props.label} onClick={handleChange(props.index)}>
              {props.label}
            </ListItem>
          ))}
        </List>
      </Wrapper>
      <div>{tab}</div>
    </div>
  );
};

export const Tabs = compose(
  withStyle(containerStyles),
  withDisplayName('Tabs')
)(TabsComponent);
