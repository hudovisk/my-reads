import React, { useEffect } from "react";
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
import {
  initBooks,
  syncBooks,
  updateBook,
  searchBooks
} from "../redux/books/books-actions";
import { useReducerAndSaga } from "./useReducerAndSaga";

export default function() {
  const [state, dispatch] = useReducerAndSaga(
    booksReducer,
    initialState,
    booksSagas
  );

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
