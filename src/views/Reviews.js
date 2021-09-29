import { useState, useEffect } from 'react';
import { fetchGetMovieReviews } from '../services/movies-api';

export default function Reviews({movieId}) {
    const [reviews, setReview] = useState([]);
    
    useEffect(() => {
        fetchGetMovieReviews(movieId).then(({results}) => setReview(results))
    }, [movieId]
    );
  
    return (
       <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({id, author, content, created_at}) => (
            <li key={id}>
              <h3>{author}, {created_at} </h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>We don`t have  reviews for this movie.</div>
      )}
    </>
    );
}

