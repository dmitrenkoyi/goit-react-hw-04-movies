import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./views/HomePage.js' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./views/MoviesPage' /* webpackChunkName: "movie-page" */));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage' /* webpackChunkName: "movie-detail-page" */));
const NotFoundView = lazy(() => import('./views/NotFoundView.js'));

export default function App() {
  return (
    <Container>
      <Navigation />

        <Suspense fallback={<Loader />}>
          <Switch>

            <Route path='/' exact>
              <HomePage />
            </Route>

            <Route path='/movies' exact>
              <MoviesPage />
            </Route>

            <Route path='/movies/:movieId' >
              <MovieDetailsPage />
            </Route>
          
            <Route>
              <NotFoundView />
            </Route>

          </Switch>

        </Suspense>
    
    </Container>
  );
}

