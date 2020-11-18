/** @format */

import React, { FunctionComponent, MouseEvent, ReactNode, Ref } from 'react';
import { compose } from 'ramda';
import {
  withDisplayName,
  withMappedProps,
  withStyle,
  withLogging,
  withRef
} from '@project/helpers';
import { styles } from './styles';

export enum ButtonTag {
  ANCHOR = 'a',
  BUTTON = 'button'
}

export enum ButtonVariant {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit'
}

export enum ButtonTheme {
  NONE = 'NONE',
  STANDARD = 'STANDARD',
  WARNING = 'WARNING'
}

type HTMLComboElement = HTMLButtonElement & HTMLAnchorElement;

export interface ButtonProps {
  children: ReactNode | ReactNode[];
  className?: string;
  disabled?: boolean;
  forwardRef?: Ref<HTMLComboElement>;
  href?: string;
  onClick?: (event: MouseEvent<HTMLComboElement>) => void;
  tag: ButtonTag;
  theme: ButtonTheme;
  type?: ButtonVariant;
}

// TODO fix ref TS
const Component: FunctionComponent<ButtonProps> = ({
  children,
  forwardRef,
  tag: Tag,
  type = ButtonVariant.BUTTON,
  ...props
}: ButtonProps) => {
  return (
    <Tag ref={forwardRef} type={type} {...props}>
      {children}
    </Tag>
  );
};

/**
 * With computed properties
 */
const computed = (props: ButtonProps) => {
  const theme = props.theme || ButtonTheme.STANDARD;

  return {
    ...props,
    tag: props.href ? ButtonTag.ANCHOR : ButtonTag.BUTTON,
    theme
  };
};

export const Button = compose(
  withStyle(compose(styles, computed)),
  withMappedProps(computed),
  withRef,
  withLogging(false),
  withDisplayName('Button')
)(Component);
