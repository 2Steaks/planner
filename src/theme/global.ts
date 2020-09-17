/** @format */

import { css, SerializedStyles } from '@emotion/core';
import reset from 'emotion-normalize';
import { fontSizeBase, fonts } from './fonts';
import { colors } from './palette';

const all = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const html = css`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    background: white;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`;

const body = css`
  body {
    font-size: ${fontSizeBase};
    font-family: 'Rubik', sans-serif;
    background-color: ${colors.white};
    height: 100%;
    color: ${colors.slate900};
  }
`;

const main = css`
  main {
    margin: 0;
  }
`;

const paragraph = css`
  p {
    margin: 0 0 1.5em;
    line-height: 1.4;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }
  }
`;

const anchor = css`
  a {
    text-decoration: none;
  }
`;

const list = css`
  ul,
  ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

const button = css`
  button {
    border: none;
    background-color: transparent;
    padding: 0;
  }
`;

const input = css`
  input {
    border: none;
    background-color: transparent;
    padding: 0;
    color: ${colors.slate900};

    &:focus {
      outline: none;
    }
  }
`;

export const globalStyles = (): SerializedStyles => css`
  ${reset}
  ${all}
  ${html}
  ${body}
  ${main}
  ${paragraph}
  ${anchor}
  ${list}
  ${fonts}
  ${button}
  ${input}
`;
