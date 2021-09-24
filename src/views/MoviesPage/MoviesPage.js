import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import SearchForm from '../../components/SearchForm';
import { fetchSearchFilm } from '../../services/movies-api';

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
                return (data.results);
            })
        .then(setMovies)
    }, [searchQuery]);


        const onChangeQuery = query => {
            setSearchQuery(query);
            history.push({
                ...location,
                search: `query=${query}`
            });
            setMovies(null);
        }
    
    
    return (
        <>
        <SearchForm formSubmit={onChangeQuery} />           
            {movies && (
                <ul>
                    {movies.map(({ id, title }) => 
                        <li key={id}>
                            <Link
                                to={{
                                    pathname: `${url}/${id}`,
                                    state: {from: location},
                            }}
                            >
                                {title}
                            </Link>
                    </li>
                    )}
                </ul>
            )}
        </>
    );
}