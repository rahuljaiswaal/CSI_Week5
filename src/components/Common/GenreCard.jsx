import { useDispatch } from 'react-redux';
import { setQuery } from '../../store/slices/searchSlice';
import { setCurrentView } from '../../store/slices/uiSlice';

const GenreCard = ({ genre }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setQuery(genre.name));
    dispatch(setCurrentView('search'));
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer group transform hover:scale-105 transition-all"
      style={{ backgroundColor: genre.color }}
      onClick={handleClick}
    >
      <div className="p-4 h-32 flex flex-col justify-between">
        <h3 className="text-white font-bold text-lg">{genre.name}</h3>
        <div className="relative">
          <img
            src={genre.image}
            alt={genre.name}
            className="w-16 h-16 rounded-lg object-cover shadow-lg transform rotate-12 group-hover:rotate-6 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default GenreCard;