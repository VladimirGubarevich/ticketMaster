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
  const { setCurrentPage, page, totalPages } = props;
  const classes = useStyles();

  const handleChange = (event, value) => {
    setCurrentPage(value - 1)
  };

  return (
    <>
      {
        totalPages
          ? <div className={classes.root}>
            <Pagination count={totalPages} page={page + 1} color="primary" onChange={handleChange} />
          </div>
          : null
      }
    </>
  );
}