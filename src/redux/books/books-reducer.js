import { createSelector } from "reselect";
import {
  BOOK_UPDATE,
  BOOKS_SEARCH_RESULT,
  BOOKS_SYNC_SUCCESS
} from "./books-actions";

export const initialState = {
  books: [],
  searchResult: []
};

export const booksReducer = (state, action) => {
  switch (action.type) {
    case BOOK_UPDATE:
      const { book, shelf } = action.payload;

      const books = {
        ...state.books,
        [book.id]: { ...book, shelf }
      };
      return { ...state, books };
    case BOOKS_SYNC_SUCCESS:
      return { ...state, books: action.payload };
    case BOOKS_SEARCH_RESULT:
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
};

const shelfFilter = shelf => book => book.shelf === shelf;

const getRawBooks = state => state.books;
export const getBooks = state => Object.values(state.books);
export const getSearchResult = state => state.searchResult;

export const getBooksSorted = createSelector(
  getBooks,
  books =>
    books.slice().sort((a, b) => {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    })
);
export const getCurrentlyReadingBooks = createSelector(
  getBooksSorted,
  books => books.filter(shelfFilter("currentlyReading"))
);
export const getWantToReadBooks = createSelector(
  getBooksSorted,
  books => books.filter(shelfFilter("wantToRead"))
);
export const getReadBooks = createSelector(
  getBooksSorted,
  books => books.filter(shelfFilter("read"))
);

export const getSearchBooks = createSelector(
  getRawBooks,
  getSearchResult,
  (books, searchResult) => {
    // If we have the book id on 'books' use it instead of search resulted book
    return searchResult.map(book => books[book.id] || book);
  }
);
