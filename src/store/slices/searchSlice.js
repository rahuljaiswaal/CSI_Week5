import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: {
    tracks: [],
    artists: [],
    albums: [],
    playlists: [],
  },
  isSearching: false,
  recentSearches: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    addRecentSearch: (state, action) => {
      const query = action.payload;
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query);
        state.recentSearches = state.recentSearches.slice(0, 10);
      }
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = {
        tracks: [],
        artists: [],
        albums: [],
        playlists: [],
      };
    },
  },
});

export const {
  setQuery,
  setResults,
  setIsSearching,
  addRecentSearch,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;