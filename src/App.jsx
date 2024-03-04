import React, { useEffect, useState } from 'react';
import './App.css';
import searchIcon from '../src/search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=19413d3f';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  useEffect(() => {
    searchMovies('superman'); // Initial search for example
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className='app'>
      <h1> Movies </h1>
      <div className="search"> 
        <input
          type="text"
          placeholder='search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress} // Attach onKeyPress event handler
        />
        <img
          src={searchIcon}
          alt='search'
          className="search-icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (<MovieCard movie={movie} key={movie.imdbID}></MovieCard>))}
        </div>
      ) : (
        <div className='empty'> <h2> No movies found</h2> </div>
      )}
    </div>
  );
}

export default App;
