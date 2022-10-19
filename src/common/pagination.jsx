//import React, { Component } from 'react';
import _ from 'lodash' // calling it underscore bc lodash is the optimized version of a popular js-library called underscore
import PropTypes from 'prop-types'; // typechecker
const Pagination = (props) => {
    /*In props we have a couple of properties,
    one is itemsCount and the other is pageSize
    these are part of this component */
    const {itemsCount, pageSize, currentPage, onPageChange} = props;
   

    //ceil returns the smallest int, greater than or equal to this floating point number
    const pageCount = Math.ceil(itemsCount/pageSize);
    if(pageCount===1) return null;

    //here we use lodash to generate an array with pageSize-numbers
    /*we have to aadd +1 bc this method will not include the end-number itself
    so if the pageNumber is 4 it will only return an array with 3 pages 
    so we need to add +1 to make sure the last page is also included */
   const pages =  _.range(1,pageCount+1)

    return <nav>
        <ul className="pagination">
            {pages.map(page=>(
                <li key={page} className={page===currentPage ? 'page-item active':'page-item'}>
                <a  className="page-link"
                onClick={()=>onPageChange(page)}>
                    {page}</a>
                </li>

            ))}
            
        </ul>
    </nav>;
}

Pagination.propTypes ={
    itemsCount:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired,
    currentPage:PropTypes.number.isRequired,
    onPageChange:PropTypes.func.isRequired

};
 
export default Pagination;