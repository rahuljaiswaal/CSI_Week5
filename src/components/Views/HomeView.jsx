import { useSelector, useDispatch } from 'react-redux';
import { Play } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying } from '../../store/slices/musicSlice';
import { mockTracks, mockAlbums, mockPlaylists } from '../../data/mockData';
import TrackItem from '../Common/TrackItem';
import AlbumCard from '../Common/AlbumCard';
import PlaylistCard from '../Common/PlaylistCard';

const HomeView = () => {
  const dispatch = useDispatch();
  const { recentlyPlayed } = useSelector(state => state.music);

  const quickAccess = mockPlaylists.slice(0, 6);
  const recentTracks = recentlyPlayed.length > 0 ? recentlyPlayed.slice(0, 6) : mockTracks.slice(0, 6);
  const featuredAlbums = mockAlbums.slice(0, 5);
  const recommendedPlaylists = mockPlaylists;

  const handlePlayTrack = (track, trackList = mockTracks) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(trackList));
    dispatch(setIsPlaying(true));
  };

  const handlePlayPlaylist = (playlist) => {
    if (playlist.tracks && playlist.tracks.length > 0) {
      dispatch(setCurrentTrack(playlist.tracks[0]));
      dispatch(setQueue(playlist.tracks));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-gray-dark to-spotify-black min-h-screen">
      <div className="p-6 space-y-8">
        {/* Quick Access */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccess.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-spotify-gray-medium bg-opacity-50 rounded-lg flex items-center space-x-4 hover:bg-opacity-70 transition-all cursor-pointer group"
                onClick={() => handlePlayPlaylist(playlist)}
              >
                <img
                  src={playlist.coverImage}
                  alt={playlist.name}
                  className="w-16 h-16 rounded-l-lg object-cover"
                />
                <span className="text-white font-medium flex-1 truncate">{playlist.name}</span>
                <button className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity mr-4">
                  <Play size={16} className="text-black ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Played */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Recently played</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recentTracks.map((track) => (
              <div
                key={track.id}
                className="bg-spotify-gray-medium bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group"
                onClick={() => handlePlayTrack(track)}
              >
                <div className="relative mb-4">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="w-full aspect-square rounded-lg object-cover"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105">
                    <Play size={16} className="text-black ml-0.5" />
                  </button>
                </div>
                <h3 className="text-white font-medium truncate mb-1">{track.title}</h3>
                <p className="text-spotify-gray-light text-sm truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Made for You */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Made for you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Popular Playlists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Popular Tracks */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Popular right now</h2>
          <div className="space-y-2">
            {mockTracks.slice(0, 8).map((track, index) => (
              <TrackItem
                key={track.id}
                track={track}
                index={index + 1}
                onPlay={() => handlePlayTrack(track)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeView;