import React, { useState, useMemo, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationTab } from './components/Tab';

const useStyles = makeStyles({
  indicator: {
    backgroundColor: '#ffffff',
  },
});

const useTabIndex = (): [string[], number] => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = useMemo(
    () => ['home', 'create', 'search', 'status boards', 'admin'],
    [],
  );

  useEffect(() => {
    // It's possible that the length of time this takes to
    // complete _might_ mean the pathname has changed before
    // the tabIndex has been set.
    const firstSlash = location.pathname.indexOf('/', 1);
    const lastIndex = firstSlash < 1 ? undefined : firstSlash;
    const uriPath = location.pathname.slice(1, lastIndex);
    setTabIndex(tabs.indexOf(uriPath.replace('-', ' ')));
  }, [location.pathname, tabs]);

  return [tabs, tabIndex];
};

export const App: React.FC = () => {
  const [tabs, tabIndex] = useTabIndex();

  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Tabs
          classes={classes}
          value={tabIndex}
          variant="fullWidth"
          component="nav"
        >
          {tabs.map(label => (
            <NavigationTab key={label} label={label} />
          ))}
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/purchase-orders" />
      </Switch>
    </>
  );
};
