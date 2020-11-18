/** @format */
import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import media from 'css-in-js-media';
import { absoluteFill, colors, gutter, styleWithHelpers } from '@project/theme';
import { Button, PlusIcon } from '@project/components';

export const Container = styled.div`
  padding: ${gutter};
  position: relative;
  height: 250px;
  border: 4px solid ${colors.slate200};
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
          background: linear-gradient(rgba(0, 0, 0, 0.5), transparent 20%);
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

    ${media('<tablet')} {
      flex-direction: column;
    }
  }

  & > div > div {
    ${media('<tablet')} {
      margin-top: calc(${gutter} / 2);
      margin-bottom: calc(${gutter} / 2);
    }

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
    ${media('<tablet')} {
      padding: 1.5rem;
    }

    padding: 2rem;
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
