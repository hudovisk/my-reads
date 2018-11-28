import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

import "./SearchPage.scss";
import Book from "../../components/Book";
import { BooksState, BooksDispatch } from "../../hooks/useBooksReducer";


const SearchPage = ({ history }) => {
  const [search, setSearch] = useState("");
  const { searchResults } = useContext(BooksState);
  const { updateBook, searchBooks } = useContext(BooksDispatch);

  useEffect(
    () => searchBooks(search),
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
        {searchResults.map(book => (
          <li key={book.id}>
            <Book book={book} onUpdate={handleBookUpdate(book)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withRouter(SearchPage);