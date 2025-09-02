import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import { baseApi } from "./api/base";
import storage from "redux-persist/lib/storage";
import {
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   persistStore,
} from "redux-persist";

const persistConfig = {
   key: "auth",
   version: 1,
   storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
   reducer: {
      auth: persistedReducer,
      [baseApi.reducerPath]: baseApi.reducer,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
