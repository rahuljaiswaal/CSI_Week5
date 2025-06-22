import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Download } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying, togglePlay } from '../../store/slices/musicSlice';
import TrackItem from '../Common/TrackItem';
import { formatTime } from '../../utils/formatTime';

const PlaylistView = () => {
  const dispatch = useDispatch();
  const { currentView } = useSelector(state => state.ui);
  const { currentPlaylist } = useSelector(state => state.playlists);
  const { currentTrack, isPlaying, favorites } = useSelector(state => state.music);

  // Handle favorites view
  const isFavoritesView = currentView === 'favorites';
  const playlist = isFavoritesView ? {
    name: 'Liked Songs',
    description: 'Songs you\'ve liked',
    tracks: [], // You can populate this with actual favorite tracks
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
  } : currentPlaylist;

  if (!playlist) {
    return (
      <div className="flex-1 bg-gradient-to-b from-spotify-gray-dark to-spotify-black min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Select a playlist to view</p>
      </div>
    );
  }

  const handlePlayPlaylist = () => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      const isCurrentPlaylist = currentTrack && playlist.tracks.some(track => track.id === currentTrack.id);
      
      if (isCurrentPlaylist) {
        dispatch(togglePlay());
      } else {
        dispatch(setCurrentTrack(playlist.tracks[0]));
        dispatch(setQueue(playlist.tracks));
        dispatch(setIsPlaying(true));
      }
    }
  };

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(playlist.tracks));
    dispatch(setIsPlaying(true));
  };

  const getTotalDuration = () => {
    if (!playlist.tracks) return 0;
    return playlist.tracks.reduce((total, track) => total + track.duration, 0);
  };

  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const isCurrentPlaylist = currentTrack && playlist.tracks?.some(track => track.id === currentTrack.id);

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-900 via-spotify-gray-dark to-spotify-black min-h-screen">
      {/* Header */}
      <div className="flex items-end space-x-6 p-6 pb-8">
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-48 h-48 rounded-lg shadow-2xl"
        />
        
        <div className="flex-1">
          <p className="text-sm font-medium text-white uppercase tracking-wide mb-2">
            {isFavoritesView ? 'Playlist' : 'Public Playlist'}
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            {playlist.name}
          </h1>
          {playlist.description && (
            <p className="text-spotify-gray-light text-lg mb-4">{playlist.description}</p>
          )}
          <div className="flex items-center space-x-2 text-sm text-white">
            <span className="font-medium">Spotify</span>
            {playlist.tracks && playlist.tracks.length > 0 && (
              <>
                <span className="text-spotify-gray-light">•</span>
                <span>{playlist.tracks.length} songs</span>
                <span className="text-spotify-gray-light">•</span>
                <span className="text-spotify-gray-light">
                  {formatTotalTime(getTotalDuration())}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 px-6 pb-6">
        <button
          onClick={handlePlayPlaylist}
          className="w-14 h-14 bg-spotify-green rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          disabled={!playlist.tracks || playlist.tracks.length === 0}
        >
          {isCurrentPlaylist && isPlaying ? (
            <Pause size={24} className="text-black" />
          ) : (
            <Play size={24} className="text-black ml-1" />
          )}
        </button>
        
        <button className="text-spotify-gray-light hover:text-white transition-colors">
          <Heart size={32} />
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
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-spotify-gray-medium mb-4">
          <div className="col-span-1 text-spotify-gray-light text-sm">#</div>
          <div className="col-span-6 lg:col-span-5 text-spotify-gray-light text-sm">Title</div>
          <div className="col-span-3 hidden lg:block text-spotify-gray-light text-sm">Album</div>
          <div className="col-span-2 text-spotify-gray-light text-sm text-right">Duration</div>
        </div>

        {/* Tracks */}
        <div className="space-y-1">
          {playlist.tracks && playlist.tracks.length > 0 ? (
            playlist.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index + 1}
                playlist={playlist.tracks}
                onPlay={() => handlePlayTrack(track)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white text-xl mb-2">
                {isFavoritesView ? 'Songs you like will appear here' : 'This playlist is empty'}
              </p>
              <p className="text-spotify-gray-light">
                {isFavoritesView 
                  ? 'Save songs by tapping the heart icon.' 
                  : 'Add some songs to get started.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;