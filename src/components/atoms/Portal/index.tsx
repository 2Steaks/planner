/** @format */

import { FunctionComponent, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEnhancedEffect } from '@project/hooks';

export interface PortalProps {
  children: ReactNode | ReactNode[];
  isDisabled?: boolean;
}

export const Portal: FunctionComponent<PortalProps> = ({
  children,
  isDisabled = false
}: PortalProps) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEnhancedEffect(() => {
    setMountNode(!isDisabled ? document.body : null);
  }, [isDisabled]);

  return mountNode ? createPortal(children, mountNode) : mountNode;
};
