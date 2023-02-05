
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export default function TrendingToday({ APIKEY }) {
  const [list, setList] = useState();
  const location = useLocation();
  const fetch = useCallback(async () => {
    try {
      const list = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=5a95e7192d9f2e90992b52e155d78e04`
      );
      await setList(list.data);
    } catch (error) {
      alert('Ouups');
    }
  },[]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <ul>
      {list?.results.map(el => {
        return (
          <li key={el.id}>
            <Link to={`movie/${el.id}`} state={{ from: location }}>
              {el.title || el.original_title || el.name}
            </Link>{' '}
          </li>
        );
      })}
    </ul>
  );
}

