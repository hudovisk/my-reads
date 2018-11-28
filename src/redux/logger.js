export default store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  return result
};
