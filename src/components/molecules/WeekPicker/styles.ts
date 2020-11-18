/** @format */

import { css, SerializedStyles } from '@emotion/core';
import { DatePicker, Button } from '@project/components';

export const styles: SerializedStyles = css`
  ${DatePicker} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${Button} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 100%;
    border-left: 0;
    border-width: 1px;
  }
`;
