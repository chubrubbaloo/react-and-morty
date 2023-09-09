// CharacterList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { fetchData } from '../api/apiHandler';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const data = await fetchData('character');
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {/* Replace this with an img later... */}
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
