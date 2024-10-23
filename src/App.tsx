import { lazy, Suspense } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './utils/routes';
import Loader from './components/loader/Loader';


function App() {
  const Home = lazy(() => import('./pages/homeSearch/HomeSearch'));
  const Recipe = lazy(() => import('./pages/recipe/Recipe'));
  const ComingSoon = lazy(() => import('./pages/comingsoon/ComingSoon'));
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.recipe}
          element={
            <Suspense fallback={<Loader />}>
              <Recipe />
            </Suspense>
          }
        />
          <Route
          path={ROUTES.comingSoon}
          element={
            <Suspense fallback={<Loader />}>
              <ComingSoon />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;