import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { paginationStyles } from '../material.styles';

export default function BasicPagination(props) {
  const { setCurrentPage, page, totalPages } = props;
  const classes = paginationStyles();

  const handleChange = (event, value) => {
    setCurrentPage(value)
  };

  return (
    <>
      {
        totalPages ?
          <div className={`${classes.root} pagination`}>
            <Pagination count={totalPages} page={page} color="primary" onChange={handleChange} />
          </div>
          : null
      }
    </>
  );
}

BasicPagination.propTypes = {
  setCurrentPage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number
}