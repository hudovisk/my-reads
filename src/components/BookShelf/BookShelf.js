import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import cx from "classnames";
import Book from "../Book";

import "./BookShelf.scss";

const BookShelf = ({ className, books, title, onBookUpdate, ...rest }) => (
  <section className={cx("book-shelf", className)}>
    <h2>{title}</h2>
    <ul>
      <TransitionGroup component={null}>
        {books.map(book => (
          <CSSTransition
            key={book.id}
            classNames="book-transition--fade"
            timeout={300}
          >
            <li>
              <Book book={book} onUpdate={shelf => onBookUpdate(book, shelf)} />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  </section>
);

export default BookShelf;