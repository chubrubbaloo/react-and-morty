import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';

function CharacterDetailPage() {
  const { id } = useParams(); // Get the character ID from the URL params using the useParams hook
  const [character, setCharacter] = useState(null);

  // Use the useEffect hook to fetch character data when the component mounts
  useEffect(() => {
    async function fetchCharacter() {
      try {
        // Fetch the specific character by ID from the API using fetchData
        const data = await fetchData(`character/${id}`);
        // Update the character state with the fetched data
        setCharacter(data);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching character:', error);
      }
    }

    fetchCharacter();
  }, [id]);

  // If character data has not been fetched yet, display a loading message
  if (!character) {
    return <div>Loading...</div>;
  }

  // Once character data is available, render the character details
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

export default CharacterDetailPage;
