import React, { useContext } from "react";
import { Link } from "react-router-dom";

import BookShelf from "../../components/BookShelf";

import "./HomePage.scss";
import { BooksState, BooksDispatch } from "../../hooks/useBooksReducer";

const HomePage = () => {
  const { currentlyReadingBooks, wantToReadBooks, readBooks } = useContext(
    BooksState
  );
  const { updateBook } = useContext(BooksDispatch);

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
          onBookUpdate={updateBook}
        />
        <BookShelf
          title={"Want to Read"}
          books={wantToReadBooks}
          onBookUpdate={updateBook}
        />
        <BookShelf title={"Read"} books={readBooks} onBookUpdate={updateBook} />
      </main>
    </div>
  );
};

export default HomePage;