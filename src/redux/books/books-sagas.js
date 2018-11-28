import { delay } from "redux-saga";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  BOOK_UPDATE,
  BOOKS_INIT,
  BOOKS_SEARCH,
  BOOKS_SYNC,
  syncBooks,
  syncBooksSuccess,
  searchBooksResult
} from "./books-actions";

import { getAll, update, search } from "../../api/books";

function* updateBook(action) {
  const { book, shelf } = action.payload;
  try {
    yield call(update, book.id, shelf);

    yield put(syncBooks());
  } catch (e) {
    console.error(e);
  }
}

function* getAllBooks(action) {
  try {
    const books = yield call(getAll);
    yield put(syncBooksSuccess(books));
  } catch (e) {
    console.error(e);
  }
}

function* searchBooks(action) {
  if (!action.payload) {
    return;
  }

  try {
    const result = yield call(search, action.payload);
    yield put(searchBooksResult(result));
  } catch(e) {
    console.error(e);
  }
}

export default function*() {
  yield takeEvery(BOOK_UPDATE, updateBook);
  yield takeLatest(BOOKS_SEARCH, function*(action) {
    // debounce
    yield call(delay, 500);
    yield call(searchBooks, action);
  });
  
  yield takeEvery(BOOKS_INIT, getAllBooks);
  yield takeLatest(BOOKS_SYNC, function*(action) {
    // debounce
    yield call(delay, 500);
    yield call(getAllBooks, action);
  });
}
