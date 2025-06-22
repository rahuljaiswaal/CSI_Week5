import { useDispatch } from 'react-redux';
import { Play } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying } from '../../store/slices/musicSlice';
import { mockTracks } from '../../data/mockData';

const ArtistCard = ({ artist }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    // Get tracks by this artist
    const artistTracks = mockTracks.filter(track => track.artist === artist.name);
    if (artistTracks.length > 0) {
      dispatch(setCurrentTrack(artistTracks[0]));
      dispatch(setQueue(artistTracks));
      dispatch(setIsPlaying(true));
    }
  };

  const formatFollowers = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-spotify-gray-medium bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group">
      <div className="relative mb-4">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full aspect-square rounded-full object-cover"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
        >
          <Play size={16} className="text-black ml-0.5" />
        </button>
      </div>
      
      <div className="text-center">
        <h3 className="text-white font-medium truncate mb-1">{artist.name}</h3>
        <p className="text-spotify-gray-light text-sm">Artist</p>
        <p className="text-spotify-gray-light text-sm">
          {formatFollowers(artist.followers)} followers
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;