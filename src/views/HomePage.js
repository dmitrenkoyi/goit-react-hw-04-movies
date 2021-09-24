import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {fetchTrendingMovies} from '../services/movies-api';


export default function HomePage() {
    const [movies, setMovies] = useState(null);
    const location = useLocation();
          
    useEffect(() => {
        fetchTrendingMovies()
        .then(data => {
        return data.results;
        })
        .then(setMovies)        
    }, []);
    
    return (
        <>
            <h2>Trending today</h2>               
            <ul>                
                {movies &&
                    movies.map(({ id, title }) => 
                        <li key={id}>
                            <Link to={{
                                pathname: `/movies/${id}`,
                                state: { from: location },
                            }}
                            >
                                {title}
                            </Link>
                        </li>
                    )}
                </ul>
        </>
    );
}