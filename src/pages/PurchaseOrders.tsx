import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PaginationTable } from '../components/PaginationTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 600,
    },
    paper: {
      padding: theme.spacing(4),
    },
  }),
);

export const PurchaseOrders: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.title} variant="h6">
        Purchase Orders
      </Typography>
      <Paper className={classes.paper}>
        <Button variant="outlined">Create PO</Button>
        <form noValidate>
          <TextField
            id="date"
            label="From:"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="To:"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            placeholder="PO Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            placeholder="Model Number"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            placeholder="Vender Order ID"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl>
            <InputLabel variant="outlined" shrink id="status">
              Status
            </InputLabel>
            <Select
              labelId="status"
              variant="outlined"
              value={10}
              onChange={(): void => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel variant="outlined" shrink id="vendor">
              Vendor
            </InputLabel>
            <Select
              labelId="vendor"
              variant="outlined"
              value=""
              onChange={(): void => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel variant="outlined" shrink id="vendor">
              User
            </InputLabel>
            <Select
              labelId="user"
              variant="outlined"
              value={10}
              onChange={(): void => {}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
        <PaginationTable />
      </Paper>
    </Container>
  );
};
