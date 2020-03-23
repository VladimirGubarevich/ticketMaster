import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <NavLink to="/" activeClassName="active" className="nav-link">TicketMasterClon</NavLink>
          </Typography>
          <div className="nav-bar__kategory">
            <NavLink to="/sports" activeClassName="active" className="nav-link">sport</NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}