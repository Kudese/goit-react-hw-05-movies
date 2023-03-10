
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { useState, useCallback, useEffect, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import s from '../PostMovie/PostMovie.module.css';
export default function PostMovie({ APIKEY }) {
  const urlData = useParams();
  const [aboutMovie, setPost] = useState();
  const location = useLocation();
  const urlBack = location.state?.from ? location.state.from : '/';
  const fetch = useCallback(async () => {
    try {
      const post = await axios.get(
        `https://api.themoviedb.org/3/movie/${urlData.moveId}?api_key=5a95e7192d9f2e90992b52e155d78e04&language=en-US`
      );
      setPost(post);
    } catch (error) {
      alert('Ouupss');
    }
  }, [urlData]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const data = aboutMovie?.data;
  const geners = () => {
    return data.genres
      .map(genre => {
        return genre.name;
      })
      .join(', ');
  };
  return (
    data && (
      <div className={s.section}>
        <Link to={urlBack}>Go back</Link>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={data.title || data.original_title || data.name}
          />
          <div>
            <h2> {data.title || data.original_title || data.name}</h2>
            <div>
              <h3>User score</h3> <p>{data.vote_average}</p>
            </div>
            <div>
              <h3>Overview</h3>
              <p>{data.overview}</p>
            </div>
            <div>
              <h3>Genres</h3>
              <p>{geners()}</p>
            </div>
            <div>
              <h3>Additional information</h3>
              <ul>
                <li>
                  <Link to={'cast'} state={{ from: urlBack }}>
                    Cast
                  </Link>
                </li>
                <li>
                  <Link to={'reviews'} state={{ from: urlBack }}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    )
  );
}
