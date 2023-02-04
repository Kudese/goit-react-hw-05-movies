import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import Loader from './Loader/Loader';
import TrendingToday from './Trending today/TrendingToday';
// import Movie from './Movie/Movie';
import PostMovie from './PostMovie/PostMovie';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
const APIKEY = '5a95e7192d9f2e90992b52e155d78e04';
const Movie =lazy(()=>import("./Movie/Movie"))

export const App = () => {
  return (
    <BrowserRouter basename="goit-react-hw-05-movies">
      <Header />
     <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="" element={<TrendingToday APIKEY={APIKEY} />} />
          <Route path="movie" element={<Movie APIKEY={APIKEY} />}></Route>
          <Route path="movie/:moveId" element={<PostMovie APIKEY={APIKEY} />}>
            <Route path="cast" element={<Cast APIKEY={APIKEY}/>} />
            <Route path='reviews' element={<Reviews APIKEY={APIKEY}/>}/>
          </Route>
        </Routes>
        </Suspense>
    </BrowserRouter>
  );
};
