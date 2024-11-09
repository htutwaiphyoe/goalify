import { legacy_createStore, applyMiddleware, AnyAction } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const bindMiddlewares = (middlewares: any[]) =>
  process.env.NODE_ENV !== "production"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

const reducer = (state: any, action: any) =>
  action.type === HYDRATE
    ? { ...state, ...action.payload }
    : rootReducer(state, action);

const initStore = () => legacy_createStore(reducer, bindMiddlewares([thunk]));

export const wrapper = createWrapper(initStore);
