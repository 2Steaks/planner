/** @format */

import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { animated } from 'react-spring';
import { colors, gutter, styleWithHelpers } from '@project/theme';
import { Button } from '@project/components/atoms/Button';
import { MenuIcon } from '@project/components/atoms/Icon/Menu';

export const styles = styleWithHelpers(
  (): SerializedStyles => css`
    position: relative;
    display: initial;

    & > ${Button} {
      padding: ${gutter};
    }

    ${MenuIcon} {
      width: 2rem;
      height: 2rem;
      fill: ${colors.slate800};
    }
  `
);

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
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 0px 3px 1px ${colors.slate800};
  padding: ${gutter};
  max-width: 100%;
  padding-bottom: calc(${gutter} * 2);
  position: absolute;
  bottom: 0;
  width: 100%;

  & > ${Button} {
    position: absolute;
    top: -${gutter};
    transform: translateY(-100%);
    right: ${gutter};
    color: white;
  }
`;

export const Body = styled('div')`
  overflow: auto;
  max-height: 85vh;
`;

export const windowAnimConfig = ({ isOpen }: { isOpen: boolean }) => ({
  transform: `translateY(${isOpen ? '0' : '100%'})`,
  config: {
    duration: 100
  }
});
