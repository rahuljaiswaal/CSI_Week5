import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentView: 'home', // 'home', 'search', 'library', 'playlist', 'album', 'artist'
  sidebarCollapsed: false,
  showCreatePlaylistModal: false,
  showAddToPlaylistModal: false,
  selectedTrackForPlaylist: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setShowCreatePlaylistModal: (state, action) => {
      state.showCreatePlaylistModal = action.payload;
    },
    setShowAddToPlaylistModal: (state, action) => {
      state.showAddToPlaylistModal = action.payload;
    },
    setSelectedTrackForPlaylist: (state, action) => {
      state.selectedTrackForPlaylist = action.payload;
    },
  },
});

export const {
  setCurrentView,
  toggleSidebar,
  setSidebarCollapsed,
  setShowCreatePlaylistModal,
  setShowAddToPlaylistModal,
  setSelectedTrackForPlaylist,
} = uiSlice.actions;

export default uiSlice.reducer;