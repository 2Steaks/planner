/** @format */

import { useCallback, useRef } from 'react';
import { useEnhancedEffect } from './useEnhancedEffect';

export const useEventCallback = (fn: (...xs: any) => void) => {
  const ref = useRef(fn);

  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args) => (0 as number, ref.current)(...args), []);
};
