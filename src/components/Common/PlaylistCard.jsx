import { useDispatch } from 'react-redux';
import { Play } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying } from '../../store/slices/musicSlice';
import { setCurrentView } from '../../store/slices/uiSlice';
import { setCurrentPlaylist } from '../../store/slices/playlistSlice';

const PlaylistCard = ({ playlist }) => {
  const dispatch = useDispatch();

  const handlePlay = (e) => {
    e.stopPropagation();
    if (playlist.tracks && playlist.tracks.length > 0) {
      dispatch(setCurrentTrack(playlist.tracks[0]));
      dispatch(setQueue(playlist.tracks));
      dispatch(setIsPlaying(true));
    }
  };

  const handleClick = () => {
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setCurrentView('playlist'));
  };

  return (
    <div 
      className="bg-spotify-gray-medium bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative mb-4">
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-full aspect-square rounded-lg object-cover"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
        >
          <Play size={16} className="text-black ml-0.5" />
        </button>
      </div>
      
      <div>
        <h3 className="text-white font-medium truncate mb-1">{playlist.name}</h3>
        <p className="text-spotify-gray-light text-sm truncate">{playlist.description}</p>
        <p className="text-spotify-gray-light text-sm">
          {playlist.tracks?.length || 0} songs
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;