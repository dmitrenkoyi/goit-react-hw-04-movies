import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useHistory, useLocation, Link, Route, Switch} from "react-router-dom";
import { fetchGetMovieDetails } from '../../services/movies-api';

import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast.js'  /* webpackChunkName: "cast-page" */));
const Reviews = lazy(() => import('../Reviews.js'  /* webpackChunkName: "reviews-page" */));


export default function MovieDetailsPage() {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();

    const history = useHistory();
    const location = useLocation();
    const prevLocation = location?.state?.from ?? '/';   

    useEffect(() => {
        fetchGetMovieDetails(movieId)
        .then(setMovie)
    }, [movieId]
    );
    
    const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
    };

    return (
        <div>
            <button
                onClick={onGoBack}
                type="button"
                className={styles.button}
            >
                Go Back
            </button>
           
            {movie && (
                <>
                    <article>
                        <img
                            className={styles.imgMovie}
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className={styles.movieDetails}>
                            <h1>{movie.title}</h1>
                            <p>User Score: {movie.vote_average * 10}%</p>
                            <h2 >Overview</h2>
                            <p>{movie.overview}</p>
                            <h2>Genres</h2>
                            <p>{movie.genres.map(genre => `${genre.name} `)}</p>
                        </div>
                    </article>
               
                    <hr />
                    <p>Additional information </p>
                    <ul>
                        <li>
                            <Link
                                to={{
                                    pathname: `/movies/${movieId}/cast`,
                                    state: {from: prevLocation},
                                }}
                            >
                                Cast
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `/movies/${movieId}/reviews`,
                                    state: {from: prevLocation},
                                }}
                            >
                                Reviews
                            </Link>
                        </li>
                    </ul>
                    <hr />
                </>
            )}          

            <Suspense>
              <Switch>
                <Route path={`/movies/:movieId/cast`}>
                    <Cast movieId={movieId} />
                </Route>
                
                <Route path={`/movies/:movieId/reviews`}>
                    <Reviews movieId={movieId}/>
                </Route>
              </Switch>
            </Suspense>
        </div>
    );
}