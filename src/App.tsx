import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavTabs } from './components/NavTabs';
import { NavAvatar } from './components/NavAvatar';
import { PurchaseOrders } from './pages/PurchaseOrders';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 1),
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" classes={classes}>
        <NavTabs />
        <NavAvatar />
      </AppBar>
      <Switch>
        <Route value="purchase-orders" path="/purchase-orders">
          <PurchaseOrders />
        </Route>
      </Switch>
    </>
  );
};
