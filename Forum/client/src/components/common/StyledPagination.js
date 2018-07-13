import React from 'react';
import Pagination from 'react-js-pagination';
import './StyledPagination.css'

const StyledPagination = (props) => (
    <Pagination
        innerClass='pagination justify-content-center'
        itemClass='page-item'
        linkClass='page-link'
        {...props}
    />
);

export default StyledPagination;