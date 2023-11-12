import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';
import {CircularProgress} from "@mui/material";

function CharacterDetailPage() {
  const { id } = useParams(); // Get the character ID from the URL params using the useParams hook
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  // Use the useEffect hook to fetch character data when the component mounts
  useEffect(() => {
    async function fetchCharacter() {
      try {
        // Fetch the specific character by ID from the API using fetchData
        const data = await fetchData(`character/${id}`);
        // Update the character state with the fetched data
        setCharacter(data);
        const episodeURLs = data.episode;

        // Use Promise.all to fetch data for all episodes simultaneously
        const episodePromises = episodeURLs.map(async (url) => {
          const episodeResponse = await fetch(url);
          if (episodeResponse.status === 200) {
            return episodeResponse.json();
          } else {
            throw new Error(`Error fetching episode data. Status: ${episodeResponse.status}`);
          }
        });

        // Wait for all episode data to be fetched
        const episodeDataArray = await Promise.all(episodePromises);

        // Extract episode details (name, episode code, air date)
        const episodeDetails = episodeDataArray.map((episodeData) => {
          return {
            name: episodeData.name,
            episode: episodeData.episode,
            air_date: episodeData.air_date,
          };
        });

        // Update the state with episode details
        setEpisodes(episodeDetails);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error fetching character:', error);
      }
    }

    fetchCharacter();
  }, [id]);

  // If character data has not been fetched yet, display a loading message
  if (!character) {
    return <div style={{margin: '2em'}}>
      <CircularProgress  color="success"/>
      <h2>Loading...</h2>
    </div>;
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
  };

  // Once character data is available, render the character details
  return (
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p className="card-text">
      {character.status} - {character.species} {'  '}
        <span
          className={`rounded-circle me-2 ${getStatusIndicatorColor(character.status)}`}
          style={{ width: '10px', height: '10px', display: 'inline-block' }}
        ></span>
      </p>
      <p>Gender: {character.gender} </p>
      <p>Origin: {character.origin.name} </p>
      <p>Last known location: {character.location.name} </p>
      <p>Has been seen in: </p>
      <ul>
        {episodes.map((episode, index) => (
          <li key={index}>

            Episode - {episode.episode}
            <br />
            Name - {episode.name}
            <br />
            Air date - {episode.air_date}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterDetailPage;
