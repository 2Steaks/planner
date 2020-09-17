/** @format */
import React, { ChangeEvent, FunctionComponent } from 'react';
import { compose } from 'ramda';
import { hasValue } from '@project/services';
import {
  withDisplayName,
  withMappedProps,
  withStyle,
  withLogging
} from '@project/helpers';
import { Image } from '@project/components/atoms/Image';
import { When } from '@project/components/atoms/When';
import { PencilIcon, PlusIcon } from '@project/components/atoms/Icon';
import { Input, InputVariant } from '@project/components/molecules/Input';
import { createFormData } from './model';
import { styles } from './styles';

export interface AvatarUploaderProps {
  accept: string;
  className?: string;
  hasImage: boolean;
  disabled?: boolean;
  name: string;
  onChange: (x: string) => void;
  value: string;
}

const Component: FunctionComponent<AvatarUploaderProps> = ({
  accept = 'image/png, image/jpeg, image/webp',
  className,
  hasImage = false,
  disabled = false,
  name,
  onChange,
  value,
  ...props
}: AvatarUploaderProps) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(createFormData(event) as any);
  }

  return (
    <div className={className}>
      <label htmlFor={name}>
        <When condition={!hasImage}>
          <PlusIcon />
        </When>
        <When condition={hasImage}>
          <Image src={value} />
        </When>
        <When condition={!disabled && hasImage}>
          <PencilIcon />
        </When>
      </label>
      <Input
        type={InputVariant.FILE}
        accept={accept}
        disabled={disabled}
        id={name}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

/**
 * With computed properties
 */
const computed = (props: AvatarUploaderProps) => ({
  ...props,
  hasImage: hasValue(props.value)
});

export const AvatarUploader = compose(
  withStyle(compose(styles, computed)),
  withLogging(false),
  withMappedProps(computed),
  withDisplayName('Image')
)(Component);
