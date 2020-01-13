import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
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
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fill-available',
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" classes={{ root: classes.root }}>
        <NavTabs />
        <NavAvatar />
      </AppBar>
      <Switch>
        <Route path="/purchase-orders">
          <PurchaseOrders />
        </Route>
        <Route path="/*">
          <div className={classes.linkContainer}>
            <Typography variant="h5">
              Hey, there&apos;s nothing here{' '}
              <Link to="/purchase-orders">visit purchase orders</Link> for
              content.
            </Typography>
          </div>
        </Route>
      </Switch>
    </>
  );
};
