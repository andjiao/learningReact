import React, { Component } from 'react';
import Table from '../common/table';
import Like from "../common/like";


class MoviesTable extends Component {
    /*The column is initialized bc it does not haave to be part of the state 
    bc it's not going to change throughout the lifecycle of this component
    */
   columns =[
       {path:'title', label:'Title'},
       {path:'genre.name', label:'Genre'},
       {path:'numberInStock', label:'Stock'},
       {path:'dailyRentalRate', label:'Rate'},
       {key:'like', 
       content: movie =>(
        <Like liked={movie.liked} onClick={()=>this.props.onLike(movie)}/>
        )
    },
       {key:'delete', 
       content: movie => (
       <button 
       onClick={()=> this.props.onDelete(movie)} 
       className="btn btn-danger btn-sm"
       >
           Delete
           </button>
           )
        },
   ];
    
    render() { 
        const {movies, onSort, sortColumn} = this.props;
    // so if we want to implement a list with customer we can reuse the Table-component
        return ( 
            <Table 
            columns ={this.columns}
            data ={movies}
            sortColumn ={sortColumn}
            onSort ={onSort}
             />

        );
           
        
    }
}
 
 
export default MoviesTable;