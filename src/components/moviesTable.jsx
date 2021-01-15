import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push({
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.props.onDelete(movie)} //I did {movie}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      });
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    //I wrote props instead of this.props

    return (
      //In future,if we want to render a table of customers all you have to do
      //is to reuse this Table component
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

/* previous implementation */
/* 
      <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th />
            <th />
          </tr>
      </thead>
      
      // Instead of rendering movies from this.state.movies, we gonna use movies array that are local to each page 
      {movies.map(movie => (
        //<li>{movie}</li>
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
           //I wrote onHandleLike() instead of onLike() 
            <Like liked={movie.liked} onClick={() => onLike(movie)} />
          </td>
          <td>
            <button
              onClick={() => onDelete(movie)} //I did {movie}
              //myError: movie itself is an object, wrapping it with {} means
              //it is wrapped by another object
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
      
     */
