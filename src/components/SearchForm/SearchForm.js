import { useState } from 'react';

import styles from './SearchForm.module.css';

export default function SearchForm({formSubmit}) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formSubmit(query);
    setQuery(''); 
  };

  return (
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={query}
            onChange={handleQueryChange}
          />
          
          <button type="submit" className={styles.FormButton}>
           Search
          </button>
        </form>
     );
}
