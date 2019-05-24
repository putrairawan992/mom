import {  createStore } from 'redux'
import reducers from "./reducers"
import storage from 'redux-persist/lib/storage';
import midlewares from "./middleware"
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, reducers)  

export const store = createStore(persistedReducer,midlewares)
export const persistor = persistStore(store)
