const api = "https://reactnd-books-api.udacity.com";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
  Authorization: token
};

export class ApiError extends Error {}

export default function fetchApi(path, options = {}) {
  const opt = {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  };

  const endpoint = api.concat(path);
  return fetch(endpoint, opt).then(response =>
    response.json().then(body => {
      if (response.status === 200) {
        return body;
      }

      if (response.status >= 400) {
        throw new ApiError(body.error);
      }
    })
  );
}
