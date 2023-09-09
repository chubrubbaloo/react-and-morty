// CharacterDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';

function CharacterDetail() {
  const { id } = useParams(); // Get the character ID from the URL params
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        // Fetch the specific character by ID from the API
        const data = await fetchData(`character/${id}`);
        setCharacter(data);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching character:', error);
      }
    }

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Character Details</h1>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
    </div>
  );
}

export default CharacterDetail;
