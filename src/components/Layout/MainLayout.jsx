import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Player from '../Player/Player';
import HomeView from '../Views/HomeView';
import SearchView from '../Views/SearchView';
import LibraryView from '../Views/LibraryView';
import PlaylistView from '../Views/PlaylistView';
import FavoritesView from '../Views/FavoritesView';
import CreatePlaylistModal from '../Modals/CreatePlaylistModal';

const MainLayout = () => {
  const { currentView, sidebarCollapsed } = useSelector(state => state.ui);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'search':
        return <SearchView />;
      case 'library':
        return <LibraryView />;
      case 'playlist':
        return <PlaylistView />;
      case 'favorites':
        return <FavoritesView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-spotify-black overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`hidden lg:block ${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 flex-shrink-0`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Player */}
      <Player />

      {/* Modals */}
      <CreatePlaylistModal />
    </div>
  );
};

export default MainLayout;