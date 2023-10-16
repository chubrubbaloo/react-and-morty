import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/apiHandler';
import SearchBar from '../components/SearchBar';
import {CharactersPageStyle} from './CharactersPageStyle.css';
import {Button, Container, Grid, Paper, styled} from "@mui/material";

function CharactersPage() {
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
        return 'bg-success';
      case 'Dead':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  if (!characters) {
    return <div>Loading...</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <h1 className="mb-4 text-color">React & Morty</h1>
      <SearchBar onSearch={searchCharacters} />


      <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
      >

        {characters.map((character) => (
            <Grid key={character.id} style={{border: '2px solid black',marginBottom: '2em', borderRadius: '8px'}}>
              <img src={character.image} alt={character.name} />
              <h5 className="card-title">
                <Link className="heading no-text-decoration" to={`/character/${character.id}`}>{character.name}</Link>
              </h5>
              <p  className="red">{character.status} - {character.species} <span className={`rounded-circle me-2 ${getStatusIndicatorColor(character.status)}`} style={{ width: '10px', height: '10px', display: 'inline-block' }}></span> </p>
              Last known location:
              <br />
              {character.location.name}
              <br />
              <br />
              First seen in:
              <br />
              {character.firstEpisode}
            </Grid>
        ))}
      </Grid>




      <div >
        {/* Disables prev and next buttons if on the first or last page */}
        <Button
            variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
            variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      </>
  );
}

export default CharactersPage;
