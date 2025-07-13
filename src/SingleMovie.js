import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const SingleMovie = () => {
  const { id } = useParams(); // imdbID from the route
  const { isLoading, movie, isError } = useFetch(`&i=${id}`); // this fetches single movie info

  if (isLoading) {
    return (
      <section className="movie-section">
        <div className="loading">Loading...</div>
      </section>
    );
  }

  if (isError.show) {
    return (
      <section className="movie-section">
        <div className="error">{isError.msg}</div>
        <NavLink to="/" className="back-btn">
          Go Back
        </NavLink>
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
          />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
