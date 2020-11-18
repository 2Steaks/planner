/** @format */

import { FunctionComponent } from 'react';
import CryptoJS from 'crypto-js';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { concat, either } from 'ramda';
import { getDisplayName, inArray } from '@project/services';

/**
 *
 * @param Component
 */
export const withStyle = (styles: any, xs: string[] = []) => (
  Component: FunctionComponent<any>
) => {
  const className = CryptoJS.SHA3(getDisplayName(Component))
    .toString(CryptoJS.enc.Base64)
    .substring(0, 6)
    .toLowerCase();

  return styled(Component, {
    shouldForwardProp: either(isPropValid, inArray(xs)),
    target: concat('x-', className)
  })(styles);
};
