import { createSlice } from '@reduxjs/toolkit';
import { mockPlaylists } from '../../data/mockData';

const initialState = {
  playlists: mockPlaylists,
  currentPlaylist: null,
};

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const newPlaylist = {
        id: Date.now().toString(),
        name: action.payload.name,
        description: action.payload.description || '',
        tracks: [],
        coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
        createdAt: new Date().toISOString(),
        isPublic: true,
      };
      state.playlists.push(newPlaylist);
    },
    addTrackToPlaylist: (state, action) => {
      const { playlistId, track } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist && !playlist.tracks.find(t => t.id === track.id)) {
        playlist.tracks.push(track);
      }
    },
    removeTrackFromPlaylist: (state, action) => {
      const { playlistId, trackId } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.tracks = playlist.tracks.filter(t => t.id !== trackId);
      }
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    updatePlaylist: (state, action) => {
      const { id, updates } = action.payload;
      const playlist = state.playlists.find(p => p.id === id);
      if (playlist) {
        Object.assign(playlist, updates);
      }
    },
  },
});

export const {
  createPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  setCurrentPlaylist,
  updatePlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;