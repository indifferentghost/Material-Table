import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { lightBlue, blueGrey } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 'auto',
    color: theme.palette.getContrastText(lightBlue[100]),
    backgroundColor: lightBlue[100],
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.getContrastText(blueGrey[800]),
    backgroundColor: blueGrey[800],
  },
}));

export const NavAvatar: React.FC<{ username?: string }> = ({
  username = 'rmortan',
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (): void => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  return (
    <>
      <Avatar
        className={classes.root}
        alt={`avatar-${username}`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {username.slice(0, 1)}
      </Avatar>
      <Popover
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>{username}</Typography>
      </Popover>
    </>
  );
};
