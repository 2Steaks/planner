/** @format */

import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { remove } from 'ramda';
import { Tag as BaseTag } from '@project/components/molecules/Tag';
import { Context, SelectContextProps } from './Select';

export interface TagProps {
  children: ReactNode;
  index: number;
}

export const Tag: FunctionComponent<TagProps> = ({
  children,
  index
}: TagProps) => {
  const { onChange, values } = useContext(Context) as SelectContextProps;

  function handleTabDelete() {
    onChange(remove(index, 1, values) as any);
  }

  return <BaseTag onClick={handleTabDelete}>{children}</BaseTag>;
};
