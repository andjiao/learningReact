import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from '../common/like';

class Movies extends Component {
    state = {  
        movies:getMovies()
    } 

    handleDelete = (movie) =>{
        /*So we are getting all the movies except the movie
        that we have passed */
      const movies =this.state.movies.filter(m=>m._id!==movie._id);

      /*So this object property we have defined on line 16,
      will override the property of oure state-object (line 6)
      Now in js, if the key and value are the same, we can remove the repeattion, so we only pass movie one time*/
      this.setState({movies})

    }

    handleLike =(movie)=>{
        const movies =[...this.state.movies];
        const index =movies.indexOf(movie);
        movies[index] ={...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    }
    render() { 
        const {length: count } =this.state.movies;
        if(count===0)return <p>There are no movies in the database</p>;
        /*fast way to generate a table, by writing this:
         table.table>thead>tr>th*4
         this technic is called zen coding

         same can be done with the tbody, by writting this:
         tbody>tr>td*4

         BUTTON:
         button.btn.btn-danger.btn-sm

         TR:
         every time you use the map we should set the key attribute, or the key property 
         on the element that you are repeating 
        */
        return (
            <React.Fragment>
                 <p>Showing {count} movie in database</p>

<table className="table">
<thead>
    <tr>
    <th>Title</th>
    <th>Genre</th>
    <th>Stock</th>
    <th>Rate</th>
    <th/>
    <th/>
    </tr>
    
</thead>
<tbody>
{this.state.movies.map(movie=>(
     <tr key={movie._id}> 
     <td>{movie.title}</td>
     <td>{movie.genre.name}</td>
     <td>{movie.numberInStock}</td>
     <td>{movie.dailyRentalRate}</td>
     <td>
         <Like liked={movie.liked} onClick={()=>this.handleLike(movie)}/>
     </td>
     <td><button onClick={()=> this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
 </tr>
))}
   
</tbody>

</table>

 </React.Fragment>
           
        );
            }
        }
 
export default Movies;