/** @format */

import styled from '@emotion/styled';
import { colors } from '@project/theme';
import { EmailIcon } from '@project/components';

export const EmailNotificationIcon = styled(EmailIcon)`
  width: 2rem;
  height: 2rem;
  position: relative;
  top: 0.2rem;
  fill: ${({ isActive }) => (isActive ? colors.green : 'inherit')};
`;
