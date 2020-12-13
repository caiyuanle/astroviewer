import { useMemo } from "react";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  Store,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  dailyPhotoReducer,
  initialDailyPhotosState,
} from "./dailyphotos/reducers";
import { DailyPhotosState } from "./dailyphotos/types";
import {
  initialMarsPhotosState,
  marsPhotosReducer,
} from "./marsphotos/reducers";
import { MarsPhotosState } from "./marsphotos/types";

let store: Store<ApplicationState> | undefined;

// The top-level state object
export interface ApplicationState {
  dailyphotos: DailyPhotosState;
  marsphotos: MarsPhotosState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  dailyphotos: dailyPhotoReducer,
  marsphotos: marsPhotosReducer,
});

const persistConfig = {
  key: "primary",
  storage,
  //whitelist: ["exampleData"], // place to select which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

const initialApplicationState = {
  dailyphotos: initialDailyPhotosState,
  marsphotos: initialMarsPhotosState,
  _persist: {
    version: -1,
    rehydrated: false,
  },
};
function makeStore(initialState = initialApplicationState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
