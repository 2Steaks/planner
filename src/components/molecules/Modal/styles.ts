/** @format */

import styled from '@emotion/styled';
import { animated } from 'react-spring';
import media from 'css-in-js-media';
import { StyledComponentWithExtra, ChildrenType } from '@project/types';
import { colors, gutter } from '@project/theme';
import { Progress } from '@project/components/molecules/Progress';

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
  padding: ${gutter};
`;

export const containerAnimConfig = {
  config: {
    duration: 150
  },
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 }
};

export const Window = styled(animated.div)`
  background-color: white;
  border-radius: 0 0 5px 5px;
  max-width: 100%;
  position: relative;

  ${media('<tablet')} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  ${media('>tablet')} {
    min-width: 300px;
  }

  ${Progress} {
    position: absolute;
    width: 100%;
    height: 3px;
    top: 0;
    left: 0;

    progress {
      border-radius: 0;

      &::-webkit-progress-bar {
        background-color: transparent;
      }
    }
  }
`;

export const windowAnimConfig = ({
  isActive,
  isTablet,
  ...props
}: {
  isActive: boolean;
  isTablet: boolean;
}) => ({
  opacity: isActive || !isTablet ? 1 : 0,
  transform: `translateY(${isActive || isTablet ? '0rem' : '2rem'})`,
  config: {
    duration: 150
  },
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
