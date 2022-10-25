import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({columns, sortColumn, onSort, data}) => {

    return (  
         /*To add the onclick on all the th at the same time, mark the <th and then press command + d */
         <table className="table">
       
         <TableHeader 
         columns = {columns} 
         sortColumn ={sortColumn} 
         onSort={onSort}/>
          {/* note that the attribute is named data instead of movies bc 
          I want this component to be completetly decoupled from movies.
          It does not know anything about movies, so we in the future can reuse this to display a list of customers */}
         <TableBody columns ={columns} data={data}/>
         {/* outcomment multiple lines: shift + option+ A */}
          </table> 
    );
}
 
export default Table;