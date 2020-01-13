import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import kebabCase from 'lodash/kebabCase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      flexGrow: 1,
    },
    tab: {
      textTransform: 'capitalize',
      [theme.breakpoints.up('sm')]: {
        minWidth: 80,
      },
    },
    indicator: {
      backgroundColor: '#ffffff',
    },
  }),
);

const getTabIndex = (pathname: string, tabs: string[]): number | false => {
  // /home
  if (pathname === '/') return 0;

  const firstSlash: number = pathname.indexOf('/', 1);
  const lastIndex = firstSlash > 1 ? firstSlash : undefined;
  const uriPath: string = pathname.slice(1, lastIndex);
  const newTabIndex: number = tabs.indexOf(uriPath.replace('-', ' '));
  return newTabIndex >= 0 ? newTabIndex : false;
};

const useTabIndex = (): [string[], number | false] => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState<number | false>(0);
  const tabs = useMemo(
    () => ['home', 'create', 'search', 'status boards', 'admin'],
    [],
  );

  useEffect(() => {
    // It's possible that the length of time this takes to
    // complete _might_ mean the pathname has changed before
    // the tabIndex has been set.
    setTabIndex(getTabIndex(location.pathname, tabs));
  }, [location.pathname, tabs]);

  return [tabs, tabIndex];
};

export const NavTabs: React.FC = () => {
  const [tabs, tabIndex] = useTabIndex();
  const classes = useStyles();
  return (
    <Tabs
      className={classes.tabs}
      classes={{ indicator: classes.indicator }}
      value={tabIndex}
      component="nav"
    >
      {tabs.map(label => (
        <Tab
          key={label}
          label={label}
          component={Link}
          className={classes.tab}
          to={`/${label === 'home' ? '' : kebabCase(label)}`}
        />
      ))}
    </Tabs>
  );
};
