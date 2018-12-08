export default ({dispatch}) => next => action => {
  // checkt and see if the action has a promise in its payload
  // if it does, wait to resolve it.
  // if not, go to the next middlware.
  // equivalent to promise-redux
  
  if (!action.payload && action.payload.then)
    return next(action);
  // if a promise, than wait for it, and dispatch the new data
  action.payload.then(response => {
    return dispatch({...action, payload: response});
  })
}