import { configureStore } from '@reduxjs/toolkit';
import musicReducer from './slices/musicSlice';
import playlistReducer from './slices/playlistSlice';
import searchReducer from './slices/searchSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    music: musicReducer,
    playlists: playlistReducer,
    search: searchReducer,
    ui: uiReducer,
  },
});

export default store;