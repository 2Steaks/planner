/** @format */
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import media from 'css-in-js-media';
import { rgba } from 'polished';
import { absoluteFill, colors, gutter, styleWithHelpers } from '@project/theme';
import { Button, PlusIcon } from '@project/components';

export const Container = styled.div`
  ${media('<tablet')} {
    height: 120px;
  }

  ${media('>tablet')} {
    height: 250px;
  }

  padding: ${gutter};
  position: relative;
  border: 2px solid ${colors.slate200};
  z-index: 1;
  position: relative;
  color: white;
`;

export const Body = styled('div')(
  styleWithHelpers(
    ({ nest, not, has }): SerializedStyles => css`
      ${absoluteFill};
      cursor: ${has('onClick', 'pointer') || 'initial'};

      ${PlusIcon} {
        ${absoluteFill};

        margin: auto;
        width: 20%;
        height: 20%;
        fill: ${colors.slate300};
      }

      ${nest(not('onClick'))} {
        &:before {
          ${absoluteFill};
          content: '';
          z-index: 1;
          background: linear-gradient(rgba(0, 0, 0, 0.5), transparent 30%);
        }
      }
    `
  )
);

export const Actions = styled.div`
  ${absoluteFill};
  z-index: 1;
  opacity: 0;
  background-color: ${rgba(colors.white, 0.5)};
  overflow: hidden;

  &:hover {
    opacity: ${(props) => (props.disabled ? 0 : 1)};
  }

  & > div {
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  & > div > div {
    &:nth-child(1) ${Button} {
      background-color: ${colors.blue};
    }

    &:nth-child(2) ${Button} {
      background-color: ${colors.green};
    }

    &:nth-child(3) ${Button} {
      background-color: ${colors.red};
    }
  }

  ${Button} {
    padding: 1.5rem;
    background-color: ${rgba(colors.slate900, 0.3)};
    border-radius: 50%;

    &:hover {
      background-color: ${rgba(colors.slate900, 0.5)};
    }
  }

  svg {
    fill: white;
    width: 2rem;
    height: 2rem;
  }
`;
