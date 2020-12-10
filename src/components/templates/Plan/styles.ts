/** @format */

import styled from '@emotion/styled';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  List,
  Wrapper
} from '@project/components';

export const WeekPickerWrapper = styled(Wrapper)`
  text-align: center;

  & > ${List} {
    font-size: 2rem;
  }

  & ${ArrowLeftIcon}, ${ArrowRightIcon} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
