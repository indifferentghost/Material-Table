import React, { useEffect, useState, useMemo, useContext } from 'react';
import { DateTime } from 'luxon';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from '../hooks/useQuery';
import { PaginationTable } from '../components/PaginationTable';
import { InputSearchField } from '../components/InputField';
import { SelectField } from '../components/SelectField';
import { DataProvider, DataContext } from '../store';

// TODO: Throw it in a context
const TEST_DATA: (string | number)[][] = Array.from({ length: 100 }).map(
  (_, i) => [
    i,
    DateTime.local()
      .minus({ days: i })
      .toFormat('yyyy-MM-dd HH:mm:ss'),
    i % 2 ? 'Ryan Morton' : 'John Silkey',
    i % 3 ? 'New' : 'Completed',
    'View',
  ],
);

const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: `0 ${theme.spacing(2)}px`,
      display: 'flex',
      alignItems: 'baseline',
      margin: `calc(${theme.spacing(1)}px * -1)`,
      '& > *': {
        flexGrow: 1,
        flexBasis: `calc(${theme.spacing(1)}px * 999)`,
        margin: theme.spacing(1),
      },
    },
  }),
);

const PurchaseOrderForm: React.FC = () => {
  const { statusList, userList } = useContext(DataContext);
  const classes = useFormStyles();
  return (
    <form className={classes.form} noValidate>
      <InputSearchField urlParam="start_date" label="From:" type="date" />
      <InputSearchField urlParam="end_date" label="To:" type="date" />
      <InputSearchField
        urlParam="po_number"
        type="number"
        placeholder="PO Number"
      />
      <InputSearchField urlParam="model_number" placeholder="Model Number" />
      <InputSearchField
        urlParam="vendor_order_id"
        placeholder="Vendor Order ID"
      />
      <SelectField id="status" label="Status" urlParam="status">
        {statusList.map((status: string) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </SelectField>
      <SelectField id="vendor" label="Vendor" urlParam="vendor" />
      <SelectField id="user" label="User" urlParam="user">
        {userList.map((user: string) => (
          <MenuItem key={user} value={user}>
            {user}
          </MenuItem>
        ))}
      </SelectField>
    </form>
  );
};

const useFormatData = (
  header: string[],
  data: (string | number)[][],
): (string | number)[][] => {
  // TODO: useContext
  const [filteredData, setFilteredData] = useState(data);
  const query = useQuery();
  const startDate = query.get('start_date');
  const endDate = query.get('end_date');
  const user = query.get('user');
  const status = query.get('status');

  useEffect(() => {
    const createdAtIndex = header.indexOf('created_at');
    const createdByIndex = header.indexOf('created_by');
    const purchaseOrderStatusIndex = header.indexOf('purchase_order_status');
    const d = data.filter((row: (string | number)[]): boolean => {
      const date = DateTime.fromFormat(
        row[createdAtIndex] as string,
        'yyyy-MM-dd HH:mm:ss',
      );

      if (startDate) {
        const start = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
        if (date < start) return false;
      }

      if (endDate) {
        const end = DateTime.fromFormat(endDate, 'yyyy-MM-dd');
        if (date > end) return false;
      }

      if (user && !user.includes(`${row[createdByIndex]}`)) return false;

      if (status && !status.includes(`${row[purchaseOrderStatusIndex]}`)) {
        return false;
      }

      return true;
    });

    setFilteredData(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, user, status, data]);

  return filteredData;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(4),
    },
    jumbotron: {
      marginTop: theme.spacing(8),
    },
    button: {
      marginBottom: theme.spacing(2),
    },
  }),
);

export const PurchaseOrders: React.FC = () => {
  const classes = useStyles();
  const headers = useMemo(
    () => ['id', 'created_at', 'created_by', 'purchase_order_status', 'View'],
    [],
  );
  const data = useFormatData(headers, TEST_DATA);

  return (
    <DataProvider headers={headers} data={TEST_DATA}>
      <Container className={classes.jumbotron}>
        <Typography className={classes.title} variant="h6">
          Purchase Orders
        </Typography>
        <Paper className={classes.paper}>
          <Button className={classes.button} variant="outlined">
            Create PO
          </Button>
          <PurchaseOrderForm />
          <PaginationTable data={[headers, ...data]} />
        </Paper>
      </Container>
    </DataProvider>
  );
};
