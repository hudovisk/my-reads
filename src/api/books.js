import fetchApi from "./api";

export const get = bookId =>
  fetchApi(`/books/${bookId}`).then(data => data.book);

export const getAll = () =>
  fetchApi(`/books`).then(data =>
    data.books.reduce((acc, book) => {
      acc[book.id] = book;
      return acc;
    }, {})
  );

export const update = (bookId, shelf) =>
  fetchApi(`/books/${bookId}`, {
    method: "PUT",
    body: JSON.stringify({ shelf })
  });

export const search = query =>
  fetchApi(`/search`, {
    method: "POST",
    body: JSON.stringify({ query })
  }).then(data => (data.books.map ? data.books : []))
  .catch(() => []);
