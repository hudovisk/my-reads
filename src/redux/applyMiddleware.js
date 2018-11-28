// Based on: https://redux.js.org/advanced/middleware#attempt-6-naively-applying-the-middleware
export default (dispatch, ...middlewares) => {
  const store = {
    getState: () => { }, // middlewares does not have support to state yet
    dispatch
  };

  middlewares = middlewares.slice();
  middlewares.reverse();
  middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)));

  return dispatch;
};
