const redux = require('redux');
const reducers = require('../reducers');

module.exports = function(initialState) {
  const store = redux.createStore(
  	reducers,
  	window.devToolsExtension ? window.devToolsExtension() : f => f,
  	initialState
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
