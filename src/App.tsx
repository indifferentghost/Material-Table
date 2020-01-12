import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavTabs } from './components/NavTabs';
import { NavAvatar } from './components/NavAvatar';

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
      <AppBar classes={classes}>
        <NavTabs />
        <NavAvatar />
      </AppBar>
      <Switch>
        <Route path="/purchase-orders" />
      </Switch>
    </>
  );
};
