import React from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { headerStyles } from '../material.styles';
import Typography from '@material-ui/core/Typography';

export default function ButtonAppBar() {
  const classes = headerStyles();

  return (
    <div className={classes.root}>
      {/* <BrowserRouter> */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              <NavLink exact to="/" activeClassName="active" className="nav-link">TicketMasterClon</NavLink>
            </Typography>
            <div className="nav-bar__kategory">
              <NavLink to="/sports" activeClassName="active" className="nav-link">sport</NavLink>
              <NavLink to="/family" activeClassName="active" className="nav-link">family</NavLink>
            </div>
          </Toolbar>
        </AppBar>
      {/* </BrowserRouter> */}
    </div>
  );
}