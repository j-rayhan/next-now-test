import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer
} from 'connected-next-router';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const routerMiddleware = createRouterMiddleware();

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
};

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      });
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = isServer => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
};

export const startClock = () => dispatch => {
  return setInterval(
    () => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }),
    1000
  );
};

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD });
};

const rootReducer = combineReducers({
  cou: reducer,
  router: routerReducer
});

const bindMiddleware = middleware => {
  const { composeWithDevTools } = require('redux-devtools-extension');
  return composeWithDevTools(applyMiddleware(...middleware));
};

export const initStore = (initialState = exampleInitialState, { asPath }) => {
  if (asPath) initialState.router = initialRouterState(asPath);
  return createStore(
    rootReducer,
    initialState,
    bindMiddleware([thunkMiddleware, loggerMiddleware, routerMiddleware])
  );
};

// export const configureStore = (initialState = {}, { asPath }) => {
//   const routerMiddleware = createRouterMiddleware()

//   if (asPath) {
//     initialState.router = initialRouterState(asPath)
//   }

//   const store = createStore(rootReducer, initialState, bindMiddleware([routerMiddleware]))
//   return store
// }
