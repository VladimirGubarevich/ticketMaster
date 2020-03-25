import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { paginationStyles } from '../material.styles';

export default function BasicPagination(props) {
  const { setCurrentPage, page, totalPages, isLoading } = props;
  const classes = paginationStyles();

  const handleChange = (event, value) => {
    setCurrentPage(value - 1)
  };

  return (
    <>
      {
        totalPages && !isLoading?
          <div className={classes.root}>
            <Pagination count={totalPages} page={page + 1} color="primary" onChange={handleChange} />
          </div>
          : null
      }
    </>
  );
}