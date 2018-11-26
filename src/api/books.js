import fetchApi from "./api";

export const get = bookId =>
  fetchApi(`/books/${bookId}`).then(data => data.book);

export const getAll = () => fetchApi(`/books`).then(data => data.books);

export const update = (book, shelf) =>
  fetchApi(`/books/${book.id}`, {
    method: "PUT",
    body: JSON.stringify({ shelf })
  });

export const search = query =>
  fetchApi(`/search`, {
    method: "POST",
    body: JSON.stringify({ query })
  }).then(data => (data.books.map ? data.books : []));
