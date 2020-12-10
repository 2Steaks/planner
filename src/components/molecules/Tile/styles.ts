/** @format */
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import media from 'css-in-js-media';
import { absoluteFill, colors, gutter, styleWithHelpers } from '@project/theme';
import { PlusIcon } from '@project/components';

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
  position: absolute;
  top: ${gutter};
  right: ${gutter};
  z-index: 2;

  svg {
    fill: white;
    width: 2rem;
    height: 2rem;
  }
`;
