import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import Loader from './Loader/Loader';
// import TrendingToday from './Trending today/TrendingToday';
// import Movie from './Movie/Movie';
// import PostMovie from './PostMovie/PostMovie';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';

const Movie =lazy(()=>import("./Movie/Movie"))
const TrendingToday =lazy(()=>import('./Trending today/TrendingToday'))
const PostMovie =lazy(()=>import('./PostMovie/PostMovie'))
const Cast =lazy(()=>import('./Cast/Cast'))
const Reviews =lazy(()=>import('./Reviews/Reviews'))

export const App = () => {
  return (
    <BrowserRouter basename="goit-react-hw-05-movies">
      <Header />
     <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="" element={<TrendingToday/>} />
          <Route path="movie" element={<Movie/>}></Route>
          <Route path="movie/:moveId" element={<PostMovie />}>
            <Route path="cast" element={<Cast/>} />
            <Route path='reviews' element={<Reviews/>}/>
          </Route>
        </Routes>
        </Suspense>
    </BrowserRouter>
  );
};
