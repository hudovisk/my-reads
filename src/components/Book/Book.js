import React from "react";
import cx from "classnames";
import _get from "lodash/get";

import "./Book.scss";

const Book = ({ className, book, onUpdate, ...rest }) => (
  <div className={cx("book", className)} {...rest}>
    <img src={_get(book, "imageLinks.thumbnail")} alt={`${book.title} cover`} />
    <h3>{book.title}</h3>
    <p>{book.authors}</p>
    <label className="book__select">
      <select
        value={book.shelf || "none"}
        onChange={({ target }) => onUpdate(target.value)}
      >
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </label>
  </div>
);

export default Book;