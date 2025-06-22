import { useSelector, useDispatch } from 'react-redux';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  Heart,
  Maximize2 
} from 'lucide-react';
import {
  togglePlay,
  nextTrack,
  previousTrack,
  setVolume,
  setCurrentTime,
  toggleShuffle,
  setRepeat,
  toggleFavorite,
} from '../../store/slices/musicSlice';
import { formatTime } from '../../utils/formatTime';

const Player = () => {
  const dispatch = useDispatch();
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    currentTime, 
    duration, 
    shuffle, 
    repeat,
    favorites 
  } = useSelector(state => state.music);

  const handlePlayPause = () => {
    dispatch(togglePlay());
  };

  const handlePrevious = () => {
    dispatch(previousTrack());
  };

  const handleNext = () => {
    dispatch(nextTrack());
  };

  const handleVolumeChange = (e) => {
    dispatch(setVolume(parseFloat(e.target.value)));
  };

  const handleProgressChange = (e) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    dispatch(setCurrentTime(newTime));
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    dispatch(setRepeat(nextMode));
  };

  const handleFavorite = () => {
    if (currentTrack) {
      dispatch(toggleFavorite(currentTrack.id));
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isFavorite = currentTrack && favorites.includes(currentTrack.id);

  if (!currentTrack) {
    return (
      <div className="h-24 bg-spotify-gray-medium border-t border-spotify-gray-dark flex items-center justify-center">
        <p className="text-spotify-gray-light text-sm">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-spotify-gray-medium border-t border-spotify-gray-dark flex items-center justify-between px-4 flex-shrink-0">
      {/* Current Track Info */}
      <div className="flex items-center space-x-4 w-1/4 min-w-0">
        <img
          src={currentTrack.coverImage}
          alt={currentTrack.title}
          className="w-14 h-14 rounded object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-white font-medium truncate">{currentTrack.title}</p>
          <p className="text-spotify-gray-light text-sm truncate">{currentTrack.artist}</p>
        </div>
        <button
          onClick={handleFavorite}
          className={`transition-colors ${
            isFavorite ? 'text-spotify-green' : 'text-spotify-gray-light hover:text-white'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-2/4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShuffle}
            className={`transition-colors ${
              shuffle ? 'text-spotify-green' : 'text-spotify-gray-light hover:text-white'
            }`}
          >
            <Shuffle size={16} />
          </button>

          <button
            onClick={handlePrevious}
            className="text-white hover:text-spotify-gray-light transition-colors"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause size={20} className="text-black" />
            ) : (
              <Play size={20} className="text-black ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="text-white hover:text-spotify-gray-light transition-colors"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={handleRepeat}
            className={`transition-colors relative ${
              repeat !== 'off' ? 'text-spotify-green' : 'text-spotify-gray-light hover:text-white'
            }`}
          >
            <Repeat size={16} />
            {repeat === 'one' && (
              <span className="absolute -top-1 -right-1 w-1 h-1 bg-spotify-green rounded-full"></span>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-spotify-gray-light w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-spotify-gray-dark rounded-lg appearance-none cursor-pointer slider progress-slider"
              style={{ '--progress': `${progress}%` }}
            />
          </div>
          <span className="text-xs text-spotify-gray-light w-10">
            {formatTime(duration || 0)}
          </span>
        </div>
      </div>

      {/* Volume and Additional Controls */}
      <div className="flex items-center space-x-4 w-1/4 justify-end">
        <button className="text-spotify-gray-light hover:text-white transition-colors hidden sm:block">
          <Maximize2 size={16} />
        </button>
        
        <div className="flex items-center space-x-2 hidden sm:flex">
          <Volume2 size={16} className="text-spotify-gray-light" />
          <div className="w-20 relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-spotify-gray-dark rounded-lg appearance-none cursor-pointer slider volume-slider"
              style={{ '--progress': `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;