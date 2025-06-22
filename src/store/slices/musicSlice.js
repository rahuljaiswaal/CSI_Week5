import { createSlice } from '@reduxjs/toolkit';
import { mockTracks } from '../../data/mockData';

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,
  queue: [],
  shuffle: false,
  repeat: 'off', // 'off', 'all', 'one'
  recentlyPlayed: [],
  favorites: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.currentTime = 0;
      // Add to recently played
      if (action.payload && !state.recentlyPlayed.find(track => track.id === action.payload.id)) {
        state.recentlyPlayed.unshift(action.payload);
        state.recentlyPlayed = state.recentlyPlayed.slice(0, 20);
      }
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    nextTrack: (state) => {
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
        const nextIndex = (currentIndex + 1) % state.queue.length;
        state.currentTrack = state.queue[nextIndex];
        state.currentTime = 0;
      }
    },
    previousTrack: (state) => {
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : state.queue.length - 1;
        state.currentTrack = state.queue[prevIndex];
        state.currentTime = 0;
      }
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    toggleFavorite: (state, action) => {
      const trackId = action.payload;
      const index = state.favorites.findIndex(id => id === trackId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(trackId);
      }
    },
  },
});

export const {
  setCurrentTrack,
  togglePlay,
  setIsPlaying,
  setVolume,
  setCurrentTime,
  setDuration,
  nextTrack,
  previousTrack,
  setQueue,
  toggleShuffle,
  setRepeat,
  toggleFavorite,
} = musicSlice.actions;

export default musicSlice.reducer;