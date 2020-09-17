/** @format */

import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  ReactNode,
  cloneElement,
  useEffect,
  useRef
} from 'react';
import { ownerDocument } from '@project/services';
import { useEventCallback, useMounted } from '@project/hooks';

export interface ClickAwayListenerProps {
  children: ReactNode | ReactNode[] | any;
  onClickAway: (event: MouseEvent<Document>) => void;
}

export const ClickAwayListener: FunctionComponent<ClickAwayListenerProps> = ({
  children,
  onClickAway
}: ClickAwayListenerProps) => {
  const isMounted = useMounted();
  const childrenRef = useRef(children.ref);

  const childrenProps = {
    ref: childrenRef
  };

  const handleClickAway = useEventCallback(
    (event: MouseEvent<Document> | any) => {
      const doc = ownerDocument(childrenRef.current);

      if (!isMounted()) {
        return;
      }

      // TODO reader monad
      const isInDOM =
        !doc.documentElement.contains(event.target) ||
        childrenRef.current.contains(event.target);

      if (!isInDOM) {
        onClickAway(event);
      }
    }
  );

  useEffect(() => {
    const doc = ownerDocument(childrenRef.current);
    doc.addEventListener('click', handleClickAway);

    return () => {
      doc.removeEventListener('click', handleClickAway);
    };
  }, [handleClickAway]);

  return <Fragment>{cloneElement(children, childrenProps)}</Fragment>;
};
