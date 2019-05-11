import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar variant="dense">
        <IconButton style={{ marginLeft: -18, marginRight: 10 }} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          Task Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
