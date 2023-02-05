import axios from 'axios';

import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function Movie({ APIKEY }) {
  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuevery = searchParams.get('search') ?? '';
  const [inputSearch, setInptSearch] = useState(searchQuevery ?? '');
  const location = useLocation();

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ search: event.target.search.value });
  };

  useEffect(() => {
    if (searchQuevery) {
      const fetch = async () => {
        const list = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=5a95e7192d9f2e90992b52e155d78e04&language=en-US&query=${searchQuevery}&page=1&include_adult=false`
        );
        setList(list.data.results);
      };
      fetch();
    }
  }, [APIKEY, searchQuevery]);

  const hendleChangeInput = event => {
    setInptSearch(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label name="search">
          Search
          <input
            name="search"
            type="text"
            onChange={hendleChangeInput}
            value={inputSearch}
          />
        </label>
        <button type="submit">Find</button>
      </form>
      <ul>
        {list.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={movie.id + ''} state={{ from: location }}>
                {movie.title || movie.original_title || movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

