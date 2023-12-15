import React, { useState } from 'react';

// MovieCard Component
const MovieCard = ({ movie, onCardClick }) => {
  const { title, description, posterURL, rating } = movie;

  return (
    <div className="movie-card" onClick={() => onCardClick(movie)}>
      <img src={posterURL} alt={title} />
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
    </div>
  );
};

// MovieList Component
const MovieList = ({ movies, onCardClick }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

// Filter Component
const Filter = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onFilterChange({ title: e.target.value, rate });
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
    onFilterChange({ title, rate: e.target.value });
  };

  return (
    <div className="filter">
      <input type="text" placeholder="Filter by title" value={title} onChange={handleTitleChange} />
      <input type="number" placeholder="Filter by rating" value={rate} onChange={handleRateChange} />
    </div>
  );
};

// Main App Component
const App = () => {
  const [movies, setMovies] = useState([]); // Array to hold movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Array to hold filtered movies
  const [selectedMovie, setSelectedMovie] = useState(null); // State to keep track of selected movie

  // Function to add a new movie
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Function to handle filter changes
  const handleFilterChange = (filters) => {
    const { title, rate } = filters;
    let filtered = movies;

    if (title) {
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (rate) {
      filtered = filtered.filter(movie => movie.rating >= parseInt(rate));
    }

    setFilteredMovies(filtered);
  };

  // Function to handle movie card click
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to handle navigating back to the home page
  const navigateBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      {selectedMovie ? (
        <div className="movie-description">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>
          {/* Embed video link goes here */}
          <button onClick={navigateBack}>Go Back</button>
        </div>
      ) : (
        <>
          <Filter onFilterChange={handleFilterChange} />
          <MovieList movies={filteredMovies.length > 0 ? filteredMovies : movies} onCardClick={handleCardClick} />
          <button onClick={() => addMovie(/* pass new movie details here */)}>Add Movie</button>
        </>
      )}
    </div>
  );
};

export default App;

