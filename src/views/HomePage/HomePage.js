import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './HomePage.module.css';

import { fetchTrendingMovies } from '../../services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then(data => {
        return data.results;
      })
      .then(setMovies);
  }, []);

  return (
    <>
      <h2 className={styles.title}>Trending today</h2>
      <ul className={styles.cardSet}>
        {movies &&
          movies.map(({ id, title, poster_path, name, release_date }) => (
            <li key={id} className={styles.item}>
              <Link
                to={{ pathname: `/movies/${id}`, state: { from: location } }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title || name}
                  className={styles.poster}
                />
                <h2 className={styles.cardTitle}>
                  {title || name}
                  {release_date && <span> ({release_date.slice(0, 4)})</span>}
                </h2>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}
