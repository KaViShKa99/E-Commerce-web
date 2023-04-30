import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { reducer as formReducer } from "redux-form";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  rootReducer,
  formReducer,
  initialState,

  compose(
    applyMiddleware(...middleware)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
