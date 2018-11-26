import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import BookShelf from "../../components/BookShelf";
import { getAll as getAllBooks, update as updateBook } from "../../api/books";

import "./HomePage.scss";

const shelfFilter = shelf => book => book.shelf === shelf;

export default () => {
  const [books, setBooks] = useState([]);
  const currentlyReadingBooks = useMemo(
    () => books.filter(shelfFilter("currentlyReading")),
    [books]
  );
  const wantToReadBooks = useMemo(
    () => books.filter(shelfFilter("wantToRead")),
    [books]
  );
  const readBooks = useMemo(() => books.filter(shelfFilter("read")), [books]);

  useEffect(() => {
    getAllBooks().then(setBooks);
  }, []); // Need the empty brackets to avoid infinit loop

  const handleBookUpdate = (book, shelf) => {
    updateBook(book, shelf)
      .then(getAllBooks)
      .then(setBooks);
  };

  return (
    <div className="home">
      <header className="home__header">MyReads</header>

      <Link to="/search" className="home__search-link" alt="search">
        <span />
        <span />
      </Link>

      <main>
        <BookShelf
          title={"Currently Reading"}
          books={currentlyReadingBooks}
          onBookUpdate={handleBookUpdate}
        />
        <BookShelf
          title={"Want to Read"}
          books={wantToReadBooks}
          onBookUpdate={handleBookUpdate}
        />
        <BookShelf
          title={"Read"}
          books={readBooks}
          onBookUpdate={handleBookUpdate}
        />
      </main>
    </div>
  );
};
