import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';
import SearchBar from '../components/SearchBar';

function CharacterList() {
  // State variables to store characters, current and total pages
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Use useEffect to fetch characters when the component mounts or when the current page changes
  useEffect(() => {
    async function fetchCharacters(page) {
      try {
        // Fetch character data for the specified page
        const data = await fetchData(`character/?page=${page}`);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
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
    }
  }

  // Function to handle moving to the next page
  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <SearchBar onSearch={searchCharacters} />
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {/* Create links to individual character detail pages */}
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>

      <div>
        {/* Disables prev and next buttons if on first or last page */}
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CharacterList;