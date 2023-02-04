import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, } from 'react-router-dom';
import { useCallback } from 'react';

export default function TrendingToday({ APIKEY }) {
  const [list, setList] = useState();
 const location = useLocation()
  const fetch = useCallback(async () => {
    try {
      const list = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`
      );
      await setList(list.data);
    } catch (error) {
      alert('Ouups');
    }
  },[APIKEY]);
  useEffect(() => {
      fetch();  
  },[fetch]);
  console.log(list?.results);
  return (
    <ul>
      {list?.results.map(el => {
        return <li key={el.id}><Link to={`movie/${el.id}`} state={location} >{el.title || el.original_title || el.name}</Link> </li>;
      })}
    </ul>
  );
}
