import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    },
  },
}));

export default function BasicPagination(props) {
  const { setCurrentPage } = props;

  const handleChange = (event, value) => {
    setCurrentPage(value - 1)
  };

  const classes = useStyles();
  const { totalPages } = props;
  return (
    <div className={classes.root}>
      <Pagination count={totalPages} color="primary" onChange={handleChange} />
    </div>
  );
}