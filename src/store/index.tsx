import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';
import imageReducer from './slices/imagesSlice';
import generateBtnReducer from './slices/generateBtnSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  tasks: tasksReducer,
  images: imageReducer,
  generateBtn: generateBtnReducer
});

const persisredReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persisredReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
