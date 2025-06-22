import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { setQuery, setResults, setIsSearching, addRecentSearch } from '../../store/slices/searchSlice';
import { mockTracks, mockAlbums, mockArtists, mockPlaylists, mockGenres } from '../../data/mockData';
import TrackItem from '../Common/TrackItem';
import AlbumCard from '../Common/AlbumCard';
import ArtistCard from '../Common/ArtistCard';
import PlaylistCard from '../Common/PlaylistCard';
import GenreCard from '../Common/GenreCard';
import { setCurrentTrack, setQueue, setIsPlaying } from '../../store/slices/musicSlice';

const SearchView = () => {
  const dispatch = useDispatch();
  const { query, results, isSearching, recentSearches } = useSelector(state => state.search);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchQuery) => {
    dispatch(setIsSearching(true));
    
    // Simulate search delay
    setTimeout(() => {
      const lowercaseQuery = searchQuery.toLowerCase();
      
      const filteredTracks = mockTracks.filter(track =>
        track.title.toLowerCase().includes(lowercaseQuery) ||
        track.artist.toLowerCase().includes(lowercaseQuery) ||
        track.album.toLowerCase().includes(lowercaseQuery)
      );

      const filteredArtists = mockArtists.filter(artist =>
        artist.name.toLowerCase().includes(lowercaseQuery)
      );

      const filteredAlbums = mockAlbums.filter(album =>
        album.title.toLowerCase().includes(lowercaseQuery) ||
        album.artist.toLowerCase().includes(lowercaseQuery)
      );

      const filteredPlaylists = mockPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(lowercaseQuery) ||
        playlist.description.toLowerCase().includes(lowercaseQuery)
      );

      dispatch(setResults({
        tracks: filteredTracks,
        artists: filteredArtists,
        albums: filteredAlbums,
        playlists: filteredPlaylists,
      }));
      
      dispatch(setIsSearching(false));
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch(setQuery(localQuery));
      dispatch(addRecentSearch(localQuery));
    }
  };

  const handlePlayTrack = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(results.tracks.length > 0 ? results.tracks : mockTracks));
    dispatch(setIsPlaying(true));
  };

  const handleRecentSearch = (searchTerm) => {
    setLocalQuery(searchTerm);
    dispatch(setQuery(searchTerm));
  };

  const hasResults = results.tracks.length > 0 || results.artists.length > 0 || 
                    results.albums.length > 0 || results.playlists.length > 0;

  return (
    <div className="flex-1 bg-gradient-to-b from-spotify-gray-dark to-spotify-black min-h-screen">
      <div className="p-6">
        {/* Search Input */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-spotify-gray-light" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-white text-black placeholder-gray-500 pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-spotify-green text-sm font-medium"
            />
          </form>
        </div>

        {!query ? (
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Recent searches</h2>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-spotify-gray-medium transition-colors text-left w-full"
                    >
                      <Search size={16} className="text-spotify-gray-light" />
                      <span className="text-white">{search}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Browse All */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {mockGenres.map((genre) => (
                  <GenreCard key={genre.id} genre={genre} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spotify-green"></div>
              </div>
            ) : hasResults ? (
              <>
                {/* Top Result */}
                {results.tracks.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Top result</h2>
                    <div className="bg-spotify-gray-medium bg-opacity-50 p-6 rounded-lg hover:bg-opacity-70 transition-all cursor-pointer group max-w-sm">
                      <div className="flex items-center space-x-4">
                        <img
                          src={results.tracks[0].coverImage}
                          alt={results.tracks[0].title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-white text-2xl font-bold mb-2">{results.tracks[0].title}</h3>
                          <p className="text-spotify-gray-light">{results.tracks[0].artist}</p>
                          <span className="inline-block bg-spotify-black px-3 py-1 rounded-full text-xs font-medium text-white mt-2">
                            SONG
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Songs */}
                {results.tracks.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
                    <div className="space-y-2">
                      {results.tracks.slice(0, 4).map((track, index) => (
                        <TrackItem
                          key={track.id}
                          track={track}
                          index={index + 1}
                          onPlay={() => handlePlayTrack(track)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Artists */}
                {results.artists.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Artists</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {results.artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Albums */}
                {results.albums.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {results.albums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Playlists */}
                {results.playlists.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Playlists</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {results.playlists.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-white text-xl mb-2">No results found for "{query}"</p>
                <p className="text-spotify-gray-light">Please make sure your words are spelled correctly or use less or different keywords.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;