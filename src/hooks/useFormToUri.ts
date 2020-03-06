import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from './useQuery';
import { useDebounce } from './useDebounce';

type FormStateValues = number | null | string;

type FormToUriHook = (
  propname: string,
  defaultProp?: FormStateValues,
) => [FormStateValues, (newState: FormStateValues) => void];

export const useFormToUri: FormToUriHook = (propname, defaultProp = '') => {
  // TODO: Split this into two hooks
  // One hook should handle syncrinization from URI to state value
  // The other should be a hook to set State and URI
  const query = useQuery();
  const routerHistory = useHistory();
  const prop: null | string = query.get(propname);
  const [state, setState] = useState<FormStateValues>(prop || defaultProp);

  const memoizedDefaultDebounceFn = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (h: any, search: string): void => h.replace({ search }),
    [],
  );

  const debounceFn = useDebounce(memoizedDefaultDebounceFn, 500);

  useEffect(() => {
    if (prop) {
      setState(prop);
    }
    // Set state on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state) {
      query.set(propname, state as string);
    } else {
      query.delete(propname);
    }
    debounceFn(routerHistory, query.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
};
