import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {fetchData} from '../api/apiHandler';
import SearchBar from '../components/SearchBar';
import {Button, CircularProgress, Grid, Paper} from "@mui/material";
import '../pages/CharactersPageStyle.css'

function CharactersPage() {
    const initialPage = parseInt(localStorage.getItem('currentPage') || 1);

    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchCharacters(page) {
            try {
                const data = await fetchData(`character/?page=${page}`);
                setCharacters(data.results);
                setTotalPages(data.info.pages);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        }

        fetchCharacters(currentPage);
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    async function handlePreviousPage() {
        if (currentPage > 1) {
            await setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    }

    async function handleNextPage() {
        if (currentPage < totalPages) {
            await setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)

        }
    }

    const searchCharacters = async (characterName) => {
        try {
            const data = await fetchData(`character/?name=${characterName}`);
            setCharacters(data.results);
        } catch (error) {
            console.error('Error searching character:', error);
        }
    }

    const getStatusIndicatorColor = status => {

        switch (status) {
            case "Alive":
                return `#008000`;
            case "Dead":
                return `#FF0000`;
            default:
                return `#808080`;
        }
    }

    if (!characters) {
        return <div className="m-5">
            <CircularProgress size="10em" color="success"/>
            <h2 className="m-5">Loading...</h2>
        </div>;
    }

    return (
        <>
            <h1 className="mt-3">Rickipedia</h1>
            <SearchBar onSearch={searchCharacters}/>
            <Grid
                container
                justifyContent="center"
            >
                {characters.map((character) => (
                    <Grid className="grid-item m-3" key={character.id}>
                        <Link className="no-text-decoration" to={`/character/${character.id}`}>
                            <Paper elevation={2}>
                                <img src={character.image} alt={character.name}/>
                                <h4 className="card-title mt-2 mb-4">
                                    {character.name}
                                </h4>
                                Current Status: <b> {character.status} </b> {' '}
                                <span
                                    className="status"
                                    style={{
                                        border: `5px solid ${getStatusIndicatorColor(character.status)}`
                                    }}>
                                </span>
                                <p className="mt-3">Species: <b>{character.species}</b></p>
                                Origin:
                                <br/>
                                <div className="pb-4"><b>{character.origin.name}</b></div>
                                Last known location:
                                <br/>
                                <div className="pb-4"><b>{character.location.name}</b></div>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>


            <div>
                <Button
                    variant="contained"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="m-3"
                >
                    Previous
                </Button>
                <b>{currentPage} / {totalPages}</b>
                <Button
                    variant="contained"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="m-3"
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default CharactersPage;
