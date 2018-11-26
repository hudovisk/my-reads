import React, { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";

import { search, update as updateBook } from "../../api/books";

import "./SearchPage.scss";
import Book from "../../components/Book";

const searchDebounced = _debounce(search, 500, { leading: true });

const SearchPage = ({ history }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  useEffect(
    () => {
      if (search) {
        searchDebounced(search)
          .then(setResult)
          .catch(() => setResult([]));
      }
    },
    [search]
  );

  const handleBookUpdate = book => shelf => {
    updateBook(book, shelf);
  }

  return (
    <div className="search">
      <header className="search__header">
        <button className="fas fa-arrow-left search__back" onClick={() => history.goBack()} />
        <input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </header>

      <ul className="search__list">
        {result.map(book => (
          <li key={book.id}>
            <Book book={book} onUpdate={handleBookUpdate(book)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(SearchPage);