import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Grid, List, Plus, Search } from 'lucide-react';
import { setShowCreatePlaylistModal } from '../../store/slices/uiSlice';
import PlaylistCard from '../Common/PlaylistCard';
import TrackItem from '../Common/TrackItem';

const LibraryView = () => {
  const dispatch = useDispatch();
  const { playlists } = useSelector(state => state.playlists);
  const { favorites } = useSelector(state => state.music);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('all'); // 'all', 'playlists', 'artists', 'albums'

  const handleCreatePlaylist = () => {
    dispatch(setShowCreatePlaylistModal(true));
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-gray-dark to-spotify-black min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Your Library</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-spotify-gray-medium' : 'hover:bg-spotify-gray-medium'} transition-colors`}
            >
              <Grid size={20} className="text-white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-spotify-gray-medium' : 'hover:bg-spotify-gray-medium'} transition-colors`}
            >
              <List size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-gray-light" />
            <input
              type="text"
              placeholder="Search in Your Library"
              className="w-full bg-spotify-gray-medium text-white placeholder-spotify-gray-light pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green text-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'playlists', 'artists', 'albums'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-white text-black'
                    : 'bg-spotify-gray-medium text-white hover:bg-spotify-gray-light hover:text-black'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Create Playlist Button */}
        <button
          onClick={handleCreatePlaylist}
          className="flex items-center space-x-3 p-4 rounded-lg hover:bg-spotify-gray-medium transition-colors mb-6"
        >
          <div className="w-12 h-12 bg-spotify-gray-light rounded flex items-center justify-center">
            <Plus size={24} className="text-black" />
          </div>
          <div>
            <p className="text-white font-medium">Create playlist</p>
            <p className="text-spotify-gray-light text-sm">It's easy, we'll help you</p>
          </div>
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Liked Songs */}
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-spotify-gray-medium transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
              <span className="text-white text-2xl">♥</span>
            </div>
            <div>
              <p className="text-white font-medium">Liked Songs</p>
              <p className="text-spotify-gray-light text-sm">{favorites.length} songs</p>
            </div>
          </div>

          {/* Playlists */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-spotify-gray-medium transition-colors cursor-pointer">
                  <img
                    src={playlist.coverImage}
                    alt={playlist.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{playlist.name}</p>
                    <p className="text-spotify-gray-light text-sm">
                      Playlist • {playlist.tracks?.length || 0} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryView;