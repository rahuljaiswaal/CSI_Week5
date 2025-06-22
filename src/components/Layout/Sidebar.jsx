import { useSelector, useDispatch } from 'react-redux';
import { Home, Search, Library, Plus, Heart } from 'lucide-react';
import { setCurrentView, setShowCreatePlaylistModal } from '../../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentView, sidebarCollapsed } = useSelector(state => state.ui);
  const { playlists } = useSelector(state => state.playlists);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const handleNavClick = (viewId) => {
    dispatch(setCurrentView(viewId));
  };

  const handleCreatePlaylist = () => {
    dispatch(setShowCreatePlaylistModal(true));
  };

  if (sidebarCollapsed) {
    return (
      <div className="w-16 bg-spotify-black flex flex-col items-center py-6 space-y-4 h-full">
        {navigationItems.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`p-3 rounded-lg transition-colors ${
              currentView === id
                ? 'bg-spotify-gray-medium text-white'
                : 'text-spotify-gray-light hover:text-white hover:bg-spotify-gray-medium'
            }`}
          >
            <Icon size={24} />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-64 bg-spotify-black flex flex-col h-full">
      {/* Navigation */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">S</span>
          </div>
          <span className="text-white font-bold text-xl">Spotify</span>
        </div>

        <nav className="space-y-2">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                currentView === id
                  ? 'bg-spotify-gray-medium text-white'
                  : 'text-spotify-gray-light hover:text-white hover:bg-spotify-gray-medium'
              }`}
            >
              <Icon size={24} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Playlists Section */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-spotify-gray-light text-sm font-medium uppercase tracking-wider">
            Playlists
          </h3>
          <button
            onClick={handleCreatePlaylist}
            className="text-spotify-gray-light hover:text-white transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => handleNavClick('favorites')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'favorites'
                ? 'bg-spotify-gray-medium text-white'
                : 'text-spotify-gray-light hover:text-white hover:bg-spotify-gray-medium'
            }`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-blue-300 rounded flex items-center justify-center">
              <Heart size={16} className="text-white" fill="currentColor" />
            </div>
            <span className="font-medium">Liked Songs</span>
          </button>

          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => {
                dispatch(setCurrentView('playlist'));
                // You can dispatch an action to set current playlist here
              }}
              className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-spotify-gray-light hover:text-white hover:bg-spotify-gray-medium"
            >
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 text-left">
                <p className="font-medium truncate">{playlist.name}</p>
                <p className="text-xs text-spotify-gray-light truncate">
                  {playlist.tracks?.length || 0} songs
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;