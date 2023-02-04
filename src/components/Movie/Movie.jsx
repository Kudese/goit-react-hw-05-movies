import axios from 'axios';
import { useEffect } from 'react';

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Movie({ APIKEY }) {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState( searchParams.get("search")??'');
  const handleSubmit = event => {
    event.preventDefault();
    fetch();
    setSearch('');
  };
 
  const fetch = async () => {
    try {
      const list = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
      );

      setList(list.data?.results);
      setSearchParams({ search });
    } catch (error) {
        console.log(search)
      alert('Ouupss');
    }
  }
useEffect(()=>{
    if(search!==""){
      fetch()
      setSearch('')
   }
},[])


  
  const hendleChangeInput = event => {
    setSearch(event.target.value);
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
            value={search}
          />
        </label>
        <button type="submit">Find</button>
      </form>
      <ul>
        {list.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={movie.id + ''}>
                {movie.title || movie.original_title || movie.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
