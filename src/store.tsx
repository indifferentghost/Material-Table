import React, { createContext, useState, useEffect } from 'react';
import uniq from 'lodash/uniq';

export const DataContext = createContext({
  data: [] as (string | number)[][],
  statusList: [] as string[],
  userList: [] as string[],
});

type DataProviderProps = {
  headers: string[];
  data: (string | number)[][];
};

export const DataProvider: React.FC<DataProviderProps> = ({
  headers,
  data,
  children,
}) => {
  const [state, setState] = useState({
    data,
    statusList: [],
    userList: [],
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((s: any) => ({
      ...s,
      statusList: uniq(
        data.map(
          (d: (string | number)[]): string | number =>
            d[headers.indexOf('purchase_order_status')],
        ),
      ),
      userList: uniq(
        data.map(
          (d: (string | number)[]): string | number =>
            d[headers.indexOf('created_by')],
        ),
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
