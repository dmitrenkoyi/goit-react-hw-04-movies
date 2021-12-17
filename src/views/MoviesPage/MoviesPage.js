import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import SearchForm from '../../components/SearchForm';
import { fetchSearchFilm } from '../../services/movies-api';

import styles from '../HomePage/HomePage.module.css';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const queryMovies = new URLSearchParams(location.search).get('query');
  const [searchQuery, setSearchQuery] = useState(queryMovies || '');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchSearchFilm(searchQuery)
      .then(data => {
        return data.results;
      })
      .then(setMovies);
  }, [searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    history.push({
      ...location,
      search: `query=${query}`,
    });
    setMovies(null);
  };

  return (
    <>
      <SearchForm formSubmit={onChangeQuery} />
      <div className={styles.container}>
        <ul className={styles.cardSet}>
          {movies &&
            movies.map(({ id, title, poster_path, name, release_date }) => (
              <li key={id} className={styles.item}>
                <Link
                  to={{
                    pathname: `${url}/${id}`,
                    state: { from: location },
                  }}
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
      </div>
    </>
  );
}
