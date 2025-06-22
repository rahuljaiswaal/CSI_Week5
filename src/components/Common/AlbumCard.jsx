import { useDispatch } from 'react-redux';
import { Play } from 'lucide-react';
import { setCurrentTrack, setQueue, setIsPlaying } from '../../store/slices/musicSlice';
import { mockTracks } from '../../data/mockData';

const AlbumCard = ({ album }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    // Get tracks for this album
    const albumTracks = mockTracks.filter(track => track.album === album.title);
    if (albumTracks.length > 0) {
      dispatch(setCurrentTrack(albumTracks[0]));
      dispatch(setQueue(albumTracks));
      dispatch(setIsPlaying(true));
    }
  };

  return (
    <div className="bg-spotify-gray-medium bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group">
      <div className="relative mb-4">
        <img
          src={album.coverImage}
          alt={album.title}
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
        <h3 className="text-white font-medium truncate mb-1">{album.title}</h3>
        <p className="text-spotify-gray-light text-sm truncate">{album.artist}</p>
        <p className="text-spotify-gray-light text-sm">{album.releaseYear}</p>
      </div>
    </div>
  );
};

export default AlbumCard;