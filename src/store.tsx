import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
});

const initalState = {};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
