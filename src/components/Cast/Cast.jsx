import { useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
export default function Cast({ APIKEY }) {
  const { moveId } = useParams();
  const [cast, setCast] = useState();

  const fetch = useCallback(async () => {
    try {
      const cast = await axios.get(
        `https://api.themoviedb.org/3/movie/${moveId}/credits?api_key=5a95e7192d9f2e90992b52e155d78e04&language=en-US`
      );
      setCast(cast);
    } catch (error) {
      alert('Ouupss');
    }
  }, [moveId]);
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      <ul>
        {cast?.data.cast.map(person => {
          return (
            <li key={person.credit_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                alt=""
              />
              <h4>{person.name}</h4>
              <p>Charater: {person.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
