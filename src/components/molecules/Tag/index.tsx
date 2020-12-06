/** @format */

import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';
import { compose } from 'ramda';
import { withDisplayName, withStyle } from '@project/helpers';
import { CrossIcon } from '@project/components/atoms/Icon/Cross';
import { Flex, FlexColumn } from '@project/components/atoms/Flex';
import { When } from '@project/components/atoms/When';
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
      <Flex>
        <FlexColumn grow={1}>
          <TagContent>{children}</TagContent>
        </FlexColumn>
        <When condition={Boolean(onClick)}>
          <FlexColumn shrink={1}>
            <TagIcon onClick={onClick}>
              <CrossIcon />
            </TagIcon>
          </FlexColumn>
        </When>
      </Flex>
    </div>
  );
};

export const Tag = compose(
  withStyle(styles),
  withDisplayName('Tag')
)(Component);
