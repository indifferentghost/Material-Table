import { useMemo, useEffect } from 'react';
import debounce from 'lodash/debounce';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceFn = (fn: any, ms: number) => any;

export const useDebounce: DebounceFn = (fn, ms) => {
  const debounceFn = useMemo(() => {
    return debounce(fn, ms);
  }, [fn, ms]);
  // This is must because fn can call setState.
  useEffect(() => {
    return (): void => {
      debounceFn.cancel();
    };
  }, [debounceFn]);
  return debounceFn;
};
