import { createAction } from "redux-actions";

export const BOOKS_INIT = "books/BOOKS_INIT";
export const BOOK_UPDATE = "books/BOOK_UPDATE";
export const BOOKS_SYNC = "books/BOOKS_SYNC";
export const BOOKS_SYNC_SUCCESS = "books/BOOKS_SYNC_SUCCESS";
export const BOOKS_SEARCH = "books/BOOKS_SEARCH";
export const BOOKS_SEARCH_RESULT = "books/BOOKS_SEARCH_RESULT";

export const initBooks = createAction(BOOKS_INIT);
export const updateBook = createAction(BOOK_UPDATE);
export const syncBooks = createAction(BOOKS_SYNC);
export const syncBooksSuccess = createAction(BOOKS_SYNC_SUCCESS);
export const searchBooks = createAction(BOOKS_SEARCH);
export const searchBooksResult = createAction(BOOKS_SEARCH_RESULT);