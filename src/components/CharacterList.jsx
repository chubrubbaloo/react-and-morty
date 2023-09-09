import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/apiHandler';

function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        // Fetch characters from the API by calling fetchData with the 'character' endpoint
        const data = await fetchData('character');
        setCharacters(data.results);
        console.log(data.results)
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching characters:', error);
      }
    }

    // Call the fetchCharacters function when the component mounts
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
