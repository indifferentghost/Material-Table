import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext({
  data: [] as (string | number)[][],
  statusList: new Set<string>(),
  userList: new Set<string>(),
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
    statusList: new Set<string>(),
    userList: new Set<string>(),
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState((s: any) => ({
      ...s,
      statusList: new Set<string>(
        data.map(
          (d: (string | number)[]): string =>
            d[headers.indexOf('purchase_order_status')] as string,
        ),
      ),
      userList: new Set<string>(
        data.map(
          (d: (string | number)[]): string =>
            d[headers.indexOf('created_by')] as string,
        ),
      ),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
