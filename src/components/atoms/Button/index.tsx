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

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit'
}

export enum ButtonVariant {
  NONE = 'NONE',
  INFO = 'INFO',
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
  variant: ButtonVariant;
  type?: ButtonType;
}

const Component: FunctionComponent<ButtonProps> = ({
  children,
  forwardRef,
  tag: Tag,
  type = ButtonType.BUTTON,
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
  const variant = props.variant || ButtonVariant.STANDARD;

  return {
    ...props,
    tag: props.href ? ButtonTag.ANCHOR : ButtonTag.BUTTON,
    variant
  };
};

export const Button = compose(
  withStyle(compose(styles, computed)),
  withRef,
  withMappedProps(computed),
  withLogging(false),
  withDisplayName('Button')
)(Component);
