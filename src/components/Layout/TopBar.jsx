import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight, User, Menu } from 'lucide-react';
import { toggleSidebar } from '../../store/slices/uiSlice';

const TopBar = () => {
  const dispatch = useDispatch();
  const { currentView } = useSelector(state => state.ui);

  const getPageTitle = () => {
    switch (currentView) {
      case 'home':
        return 'Good evening';
      case 'search':
        return 'Search';
      case 'library':
        return 'Your Library';
      case 'favorites':
        return 'Liked Songs';
      case 'playlist':
        return 'Playlist';
      default:
        return 'Spotify';
    }
  };

  return (
    <div className="h-16 bg-spotify-gray-dark bg-opacity-95 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden text-white hover:text-spotify-gray-light transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-spotify-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 rounded-full bg-spotify-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        <h1 className="text-white text-2xl font-bold">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-spotify-black hover:bg-spotify-gray-medium text-white px-4 py-2 rounded-full font-medium transition-colors">
          Upgrade
        </button>
        
        <button className="flex items-center space-x-2 bg-spotify-black hover:bg-spotify-gray-medium text-white px-4 py-2 rounded-full font-medium transition-colors">
          <User size={16} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;