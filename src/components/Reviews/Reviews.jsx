import { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
export default function Reviews({ APIKEY }) {
  const { moveId } = useParams();
  console.log(moveId);
  console.log(APIKEY);
  const [reviews, setReviews] = useState({});
  const [page, setPage] = useState(1);
  const handleReadMore = () => {
    setPage(prev => prev++);
  };
  const fetch = useCallback(async () => {
    try {
      const reviews = await axios.get(
        `https://api.themoviedb.org/3/movie/${moveId}/reviews?api_key=${APIKEY}&language=en-US&page=${page}`
      );
      setReviews(() => reviews);
    } catch (error) {
      alert('Ouupss');
    }
  }, [moveId, APIKEY, page]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  console.log(reviews.data);
  return (
    <div>
      {reviews.data?.total_results !== 0 ? (
        reviews.data?.results.map(review => {
          return (
            <div key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </div>
          );
        })
      ) : (
        <p>Not coments</p>
      )}
      {( reviews.data?.total_pages !== page && reviews.data?.total_pages!==0) ? (
        <button type="button" onClick={handleReadMore}>
          Read more
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
