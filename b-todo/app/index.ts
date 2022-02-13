import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import todo from "./todo";

const rootReducer = combineReducers({
  todo,
});

const reducer = (state: CombinedState<any>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }

  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...state, // use previous state
  //     ...action.payload, // apply delta from hydration
  //   };
  //   if (state.count) nextState.count = state.count;
  //   return nextState;
  // }

  return rootReducer(state, action);
  // return combineReducers({})(state, action);
};

//* 스토어의 타입
export type RootState = ReturnType<typeof rootReducer>;

//* 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = (context: any) =>
  configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV !== "production",
});
