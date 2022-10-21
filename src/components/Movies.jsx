import { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Pagination from '../common/pagination';
import { pagination} from '../utils/paginate';
import ListGroup from '../common/listGroup';
import {getGenres} from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {  
        movies:[],
        genres:[],
        currentPage:1,
        pageSize:4,
        sortColumn: {path:'title', order: 'asc'}
    } 

    componentDidMount(){
        const genres =[{_id:'',name:'All Genres'},...getGenres()]
        this.setState({movies:getMovies(), genres});
    }

    handleDelete = (movie) =>{
        /*So we are getting all the movies except the movie
        that we have passed */
      const movies =this.state.movies.filter(m=>m._id!==movie._id);

      /*So this object property we have defined on line 16,
      will override the property of oure state-object (line 6)
      Now in js, if the key and value are the same, we can remove the repeattion, so we only pass movie one time*/
      this.setState({movies})

    };

    handleLike =(movie)=>{
        const movies =[...this.state.movies];
        const index =movies.indexOf(movie);
        movies[index] ={...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});

    };

    handlePageChange =page =>{
        this.setState({currentPage:page});
    };

    handleGenreSelect = genre =>{
        this.setState({selectedGenre:genre, currentPage:1});
    }

    handleSort = path =>{
       this.setState({sortColumn:{path, order:'asc'}});
    }
    render() { 
        const {length: count } =this.state.movies;
        const{
            pageSize, 
            currentPage,
            sortColumn, 
            movies:allMovies, 
            selectedGenre} = this.state;

        if(count===0)return <p>There are no movies in the database</p>;
        const filtered =selectedGenre && selectedGenre._id
        ? allMovies.filter(m=>m.genre._id === selectedGenre._id)
        : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

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
       const movies = pagination(sorted, currentPage, pageSize)
        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                    items = {this.state.genres}
                    selectedItem = {this.state.selectedGenre} 
                    onItemSelect={this.handleGenreSelect}
                    
                    
                    
                    />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movie in database</p>
                <MoviesTable 
                movies ={movies}
                onLike = {this.handleLike}
                onDelete ={this.handleDelete}
                onSort = {this.handleSort}
                />
<Pagination 
itemsCount={filtered.length} 
pageSize={pageSize} 
currentPage ={currentPage}
onPageChange={this.handlePageChange}/>
                </div>
                 

 </div>
           
        );
            }
        }
 
export default Movies;