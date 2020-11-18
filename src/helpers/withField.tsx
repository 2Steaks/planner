/**
 * @format
 */

import React, { FunctionComponent } from 'react';
import { useField } from 'formik';
import styled from '@emotion/styled';
import { colors, gutter } from '@project/theme';
import { getDisplayName } from '@project/services';

const FieldContainer = styled('div')``;

const FieldBody = styled('div')``;

const FieldError = styled('div')`
  color: ${colors.red};
  text-align: right;
  font-size: 1.2rem;
  padding-top: ${gutter};
`;

export const withField = (
  Component: FunctionComponent<any>,
  initialProps: any = {}
) => {
  function Wrapped(props: any) {
    const [field, meta, helpers] = useField({
      ...initialProps,
      ...props
    } as any);
    const hasError = Boolean(meta.touched && meta.error);

    return (
      <FieldContainer>
        <FieldBody>
          <Component
            id={field.name}
            hasError={hasError}
            {...field}
            {...meta}
            {...helpers}
            {...props}
          />
        </FieldBody>

        {hasError && (
          <FieldError>
            <span>{meta.error}</span>
          </FieldError>
        )}
      </FieldContainer>
    );
  }

  Wrapped.displayName = `withField(${getDisplayName(Component)})`;
  return Wrapped;
};
