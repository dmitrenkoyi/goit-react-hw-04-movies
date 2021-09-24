import { useState, useEffect} from 'react';
import { fetchGetMovieCast } from '../services/movies-api';

import styles from './MovieDetailsPage/MovieDetailsPage.module.css';

export default function Cast({movieId}) {
    const [cast, setCast] = useState(null);
        
    useEffect(() => {
        fetchGetMovieCast(movieId)
        .then(({cast}) => setCast(cast))
    }, [movieId]
    );
    
    return (
        <div>
            <ul className={styles.thumb}>
                {cast && 
                    cast.map(({id, profile_path, name}) =>
                      <li key={id} className={styles.item}>
                            <img
                                className={styles.castImg}
                                src={
                                    profile_path
                                        ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                                        : 'https://image.tmdb.org/t/p/w200/cgoy7t5Ve075naBPcewZrc08qGw.jpg'}
                                alt={name}
                            />
                            <p>{name}</p>
                      </li>
                )}
            </ul>
        </div>
    );
}