import React, { lazy } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.scss";
import withSuspense from "./components/withSuspense";
import useBooksReducer, {
  BooksStateProvider,
  BooksDispatchProvider
} from "./hooks/useBooksReducer";


const LazySearchPage = lazy(() =>
  import(/* webpackChunkName: 'search' */ "./pages/SearchPage")
);
const SearchPage = withSuspense(LazySearchPage);

export default () => {
  const [booksState, dispatch] = useBooksReducer();

  return (
    <BooksDispatchProvider dispatch={dispatch}>
      <BooksStateProvider state={booksState}>
        <Router>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="page-transition--fade"
                  timeout={300}
                >
                  <Switch location={location}>
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Router>
      </BooksStateProvider>
    </BooksDispatchProvider>
  );
};
