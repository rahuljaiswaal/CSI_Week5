import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, Heart, Download, MoreHorizontal } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying, togglePlay, toggleFavorite } from '../../store/slices/musicSlice';
import { mockTracks } from '../../data/mockData';
import TrackItem from '../Common/TrackItem';
import { formatDuration } from '../../utils/formatTime';

const FavoritesView = () => {
  const dispatch = useDispatch();
  const { favorites, currentTrack, isPlaying } = useSelector(state => state.music);
  
  // Get actual favorite tracks from mockTracks
  const favoriteTracks = mockTracks.filter(track => favorites.includes(track.id));
  
  const handlePlayFavorites = () => {
    if (favoriteTracks.length > 0) {
      const isCurrentlyPlayingFavorites = currentTrack && favorites.includes(currentTrack.id);
      
      if (isCurrentlyPlayingFavorites) {
        dispatch(togglePlay());
      } else {
        dispatch(setCurrentTrack(favoriteTracks[0]));
        dispatch(setQueue(favoriteTracks));
        dispatch(setIsPlaying(true));
      }
    }
  };

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(favoriteTracks));
    dispatch(setIsPlaying(true));
  };

  const getTotalDuration = () => {
    return favoriteTracks.reduce((total, track) => total + track.duration, 0);
  };

  const isCurrentlyPlayingFavorites = currentTrack && favorites.includes(currentTrack.id);

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 via-spotify-gray-dark to-spotify-black min-h-screen">
      {/* Header */}
      <div className="flex items-end space-x-6 p-6 pb-8">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-700 to-blue-300 rounded-lg shadow-2xl flex items-center justify-center">
          <Heart size={80} className="text-white" fill="currentColor" />
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-white uppercase tracking-wide mb-2">
            Playlist
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Liked Songs
          </h1>
          <div className="flex items-center space-x-2 text-sm text-white">
            <span className="font-medium">Spotify</span>
            {favoriteTracks.length > 0 && (
              <>
                <span className="text-spotify-gray-light">•</span>
                <span>{favoriteTracks.length} songs</span>
                <span className="text-spotify-gray-light">•</span>
                <span className="text-spotify-gray-light">
                  {formatDuration(getTotalDuration())}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 px-6 pb-6">
        <button
          onClick={handlePlayFavorites}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={favoriteTracks.length === 0}
        >
          {isCurrentlyPlayingFavorites && isPlaying ? (
            <Pause size={24} className="text-black" />
          ) : (
            <Play size={24} className="text-black ml-1" />
          )}
        </button>
        
        <button className="text-spotify-green">
          <Heart size={32} fill="currentColor" />
        </button>
        
        <button className="text-spotify-gray-light hover:text-white transition-colors">
          <Download size={32} />
        </button>
        
        <button className="text-spotify-gray-light hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Track List */}
      <div className="px-6">
        {favoriteTracks.length > 0 ? (
          <>
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-spotify-gray-medium mb-4">
              <div className="col-span-1 text-spotify-gray-light text-sm">#</div>
              <div className="col-span-6 lg:col-span-5 text-spotify-gray-light text-sm">Title</div>
              <div className="col-span-3 hidden lg:block text-spotify-gray-light text-sm">Album</div>
              <div className="col-span-2 text-spotify-gray-light text-sm text-right">Duration</div>
            </div>

            {/* Tracks */}
            <div className="space-y-1">
              {favoriteTracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index + 1}
                  playlist={favoriteTracks}
                  onPlay={() => handlePlayTrack(track)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Heart size={64} className="text-spotify-gray-light mx-auto mb-4" />
            <p className="text-white text-xl mb-2">Songs you like will appear here</p>
            <p className="text-spotify-gray-light">
              Save songs by tapping the heart icon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;