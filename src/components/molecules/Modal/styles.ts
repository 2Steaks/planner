/** @format */

import styled from '@emotion/styled';
import { animated, config } from 'react-spring';
import { colors, gutter } from '@project/theme';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';

export const Container = styled(animated.div)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const containerAnimConfig = ({
  isActive,
  ...props
}: {
  isActive: boolean;
  onStart: () => void;
  onRest: () => void;
}) => ({
  opacity: isActive ? 1 : 0,
  config: config.gentle,
  ...props
});

export const Window = styled(animated.div)`
  background-color: white;
  border-radius: 5px;
  min-width: 40rem;
`;

export const windowAnimConfig = ({
  isActive,
  ...props
}: {
  isActive: boolean;
}) => ({
  opacity: isActive ? 1 : 0,
  transform: `translateY(${isActive ? '0rem' : '2rem'})`,
  config: config.gentle,
  ...props
});

export const Header: StyledComponentWithExtra<ChildrenType> = styled('header')`
  border-bottom: 1px solid ${colors.slate200};
  padding: ${gutter};
`;

export const Body: StyledComponentWithExtra<ChildrenType> = styled('div')`
  padding: ${gutter};
`;

export const Footer: StyledComponentWithExtra<ChildrenType> = styled('div')`
  border-top: 1px solid ${colors.slate200};
  padding: ${gutter};
`;
