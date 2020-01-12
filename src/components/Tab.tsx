import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import kebabCase from 'lodash/kebabCase';

const useStyles = makeStyles(theme => ({
  root: {
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      minWidth: 80,
    },
  },
}));

export const NavigationTab: React.FC<{ label: string }> = ({ label }) => {
  const classes = useStyles();
  return (
    <Tab
      label={label}
      component={Link}
      classes={classes}
      to={`/${kebabCase(label)}`}
    />
  );
};
