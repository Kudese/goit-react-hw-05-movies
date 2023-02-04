import axios from 'axios';
import Loader from 'components/Loader/Loader';
import { useState, useCallback, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import s from '../PostMovie/PostMovie.module.css';
export default function PostMovie({ APIKEY }) {
  const urlData = useParams();
  const [aboutMovie, setPost] = useState();
  const location= useLocation()
  const [backUrl,setBackUrl] =useState()
  
  console.log(location.state?.pathname )
   console.log(location.state?.search )
  const fetch = useCallback(async () => {
    try {
      const post = await axios.get(
        `https://api.themoviedb.org/3/movie/${urlData.moveId}?api_key=${APIKEY}&language=en-US`
      );
      setPost(post);
    } catch (error) {
      alert('Ouupss');
    }
  }, [APIKEY, urlData]);
useEffect(()=>{
  setBackUrl(location.state?.pathname +location.state?.search)
},[location.state?.pathname, location.state?.search])
  useEffect(() => {
    fetch();
  }, [fetch]);
console.log(backUrl)
  const data = aboutMovie?.data;
  const geners = () => {
    return data.genres
      .map(genre => {
        return genre.name;
      })
      .join(', ');
  };

  return !data ? (
    <Loader />
  ) : (
    <div className={s.section}>
      <Link to={backUrl}>Go back</Link>
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
                <Link to={"cast"} >Cast</Link>
              </li>
              <li>
                <Link to={"reviews"}>Reviews</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
