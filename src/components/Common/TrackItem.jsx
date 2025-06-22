import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying, togglePlay, toggleFavorite } from '../../store/slices/musicSlice';
import { formatTime } from '../../utils/formatTime';

const TrackItem = ({ track, index, onPlay, showIndex = true, playlist = [] }) => {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, favorites } = useSelector(state => state.music);
  
  const isCurrentTrack = currentTrack?.id === track.id;
  const isFavorite = favorites.includes(track.id);

  const handlePlay = () => {
    if (isCurrentTrack) {
      dispatch(togglePlay());
    } else {
      dispatch(setCurrentTrack(track));
      dispatch(setQueue(playlist.length > 0 ? playlist : [track]));
      dispatch(setIsPlaying(true));
    }
    if (onPlay) onPlay();
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(track.id));
  };

  return (
    <div 
      className="grid grid-cols-12 gap-4 px-4 py-2 rounded-lg hover:bg-spotify-gray-medium hover:bg-opacity-50 transition-all cursor-pointer group"
      onClick={handlePlay}
    >
      {/* Index/Play Button */}
      <div className="col-span-1 flex items-center justify-center">
        {showIndex && (
          <>
            <span className={`text-sm ${isCurrentTrack ? 'text-spotify-green' : 'text-spotify-gray-light'} group-hover:hidden`}>
              {isCurrentTrack && isPlaying ? '♪' : index}
            </span>
            <button className="hidden group-hover:flex items-center justify-center">
              {isCurrentTrack && isPlaying ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-white" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Track Info */}
      <div className="col-span-6 lg:col-span-5 flex items-center space-x-3 min-w-0">
        <img
          src={track.coverImage}
          alt={track.title}
          className="w-10 h-10 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className={`font-medium truncate ${isCurrentTrack ? 'text-spotify-green' : 'text-white'}`}>
            {track.title}
          </p>
          <p className="text-sm text-spotify-gray-light truncate">{track.artist}</p>
        </div>
      </div>

      {/* Album */}
      <div className="col-span-3 hidden lg:flex items-center">
        <p className="text-sm text-spotify-gray-light truncate">{track.album}</p>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center justify-end space-x-2">
        <button
          onClick={handleFavorite}
          className={`opacity-0 group-hover:opacity-100 transition-opacity ${
            isFavorite ? 'text-spotify-green' : 'text-spotify-gray-light hover:text-white'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        
        <span className="text-sm text-spotify-gray-light">{formatTime(track.duration)}</span>
        
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-spotify-gray-light hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrackItem;