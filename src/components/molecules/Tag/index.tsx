/** @format */

import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { CrossIcon } from '@project/components/atoms/Icon/Cross';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { styles, TagContent, TagIcon } from './style';

export interface TagProps {
  checked?: boolean;
  children: ReactNode;
  label?: string;
  name: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const Component: FunctionComponent<TagProps> = ({
  children,
  onClick,
  ...props
}: TagProps) => {
  return (
    <div {...props}>
      <Flex spacing="0.2rem">
        <FlexColumn grow={1}>
          <TagContent>{children}</TagContent>
        </FlexColumn>
        <FlexColumn shrink={1}>
          <TagIcon onClick={onClick}>
            <CrossIcon />
          </TagIcon>
        </FlexColumn>
      </Flex>
    </div>
  );
};

export const Tag = compose(
  withStyle(styles),
  withDisplayName('Tag')
)(Component);
