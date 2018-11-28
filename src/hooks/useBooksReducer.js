import React, { useReducer, useMemo, useEffect } from "react";
import createSagaMiddleware from "redux-saga";
import {
  booksReducer,
  initialState,
  getBooks,
  getCurrentlyReadingBooks,
  getWantToReadBooks,
  getReadBooks,
  getSearchBooks
} from "../redux/books/books-reducer";
import booksSagas from "../redux/books/books-sagas";
import applyMiddleware from "../redux/applyMiddleware";
import {
  initBooks,
  syncBooks,
  updateBook,
  searchBooks
} from "../redux/books/books-actions";
import logger from "../redux/logger";

const sagaMiddleware = createSagaMiddleware();

export default function() {
  let [state, dispatch] = useReducer(booksReducer, initialState);
  dispatch = useMemo(() => {
    let dispatchWithMiddleware = applyMiddleware(
      dispatch,
      logger,
      sagaMiddleware
    );

    sagaMiddleware.run(booksSagas);

    return dispatchWithMiddleware;
  }, []);

  // Initialize books
  useEffect(() => {
    dispatch(initBooks());
  }, []);

  return [state, dispatch];
}

// React recomends that we use different context for state and dispatch
// for perfomance reasons
// https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
export const BooksState = React.createContext();
export const BooksDispatch = React.createContext();

export const BooksStateProvider = ({ state, children }) => (
  <BooksState.Provider
    value={{
      books: getBooks(state),
      currentlyReadingBooks: getCurrentlyReadingBooks(state),
      wantToReadBooks: getWantToReadBooks(state),
      readBooks: getReadBooks(state),
      searchResults: getSearchBooks(state)
    }}
  >
    {children}
  </BooksState.Provider>
);

export const BooksDispatchProvider = ({ dispatch, children }) => (
  <BooksDispatch.Provider
    value={{
      syncBooks: books => dispatch(syncBooks(books)),
      updateBook: (book, shelf) => dispatch(updateBook({ book, shelf })),
      searchBooks: query => dispatch(searchBooks(query))
    }}
  >
    {children}
  </BooksDispatch.Provider>
);
