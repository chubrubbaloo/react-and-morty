import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';
import SearchBar from '../components/SearchBar';

function CharactersPage() {
  // State variables to store characters, current and total pages
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // test

  // Use useEffect to fetch characters when the component mounts or when the current page changes
  useEffect(() => {
    async function fetchCharacters(page) {
      try {
        // Fetch character data for the specified page
        const data = await fetchData(`character/?page=${page}`);
        setCharacters(data.results);
        setTotalPages(data.info.pages);

        // Fetch and set the first episode for each character
        const charactersWithFirstEpisodes = await Promise.all(
          data.results.map(async (character) => {
            const firstEpisodeUrl = character.episode[0];
            const firstEpisodeResponse = await fetch(firstEpisodeUrl);
            if (firstEpisodeResponse.status === 200) {
              const firstEpisodeData = await firstEpisodeResponse.json();
              character.firstEpisode = firstEpisodeData.name;
            }
            return character;
          })
        );

        setCharacters(charactersWithFirstEpisodes);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    // Call fetchCharacters with the current page
    fetchCharacters(currentPage);
  }, [currentPage]);

  // Function to handle moving to the previous page
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  }

  // Function to handle moving to the next page
  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  }

  // Search...
  const searchCharacters = async (characterName) => {
    try {
      const data = await fetchData(`character/?name=${characterName}`);
      setCharacters(data.results);
    } catch (error) {
      console.error('Error searching character:', error);
    }
  }

  // Function to get the appropriate status indicator color
  const getStatusIndicatorColor = (status) => {
    switch (status) {
      case 'Alive':
        return 'bg-success'; // Green
      case 'Dead':
        return 'bg-danger'; // Red
      default:
        return 'bg-secondary'; // Grey
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Rick and Morty Characters</h1>
      <SearchBar onSearch={searchCharacters} />
      <div className="row">
        {characters.map((character) => (
          <div key={character.id} className="col-md-3 mb-3">
            <div className="card">
              <img src={character.image} alt={character.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">
                  <Link style={{ textDecoration: 'none' }} to={`/character/${character.id}`}>{character.name}</Link>
                </h5>
                <p className="card-text">{character.status} - {character.species} <span className={`rounded-circle me-2 ${getStatusIndicatorColor(character.status)}`} style={{ width: '10px', height: '10px', display: 'inline-block' }}></span> </p>
                Last known location:
                <br />
                {character.location.name}
                <br />
                <br />
                First seen in:
                <br />
                {character.firstEpisode}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 d-flex justify-content-between align-items-center">
        {/* Disables prev and next buttons if on the first or last page */}
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CharactersPage;
