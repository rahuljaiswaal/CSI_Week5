import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { setShowCreatePlaylistModal } from '../../store/slices/uiSlice';
import { createPlaylist } from '../../store/slices/playlistSlice';

const CreatePlaylistModal = () => {
  const dispatch = useDispatch();
  const { showCreatePlaylistModal } = useSelector(state => state.ui);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    dispatch(setShowCreatePlaylistModal(false));
    setName('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createPlaylist({
        name: name.trim(),
        description: description.trim(),
      }));
      handleClose();
    }
  };

  if (!showCreatePlaylistModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-spotify-gray-medium rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create playlist</h2>
          <button
            onClick={handleClose}
            className="text-spotify-gray-light hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Playlist #1"
              className="w-full bg-spotify-gray-dark text-white placeholder-spotify-gray-light px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-spotify-green"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add an optional description"
              rows="3"
              className="w-full bg-spotify-gray-dark text-white placeholder-spotify-gray-light px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-spotify-green resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-white font-medium hover:text-spotify-gray-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-medium rounded-full hover:scale-105 transition-transform"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;