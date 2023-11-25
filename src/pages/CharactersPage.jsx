import React, {useEffect, useState} from 'react';
import {fetchData} from '../api/apiHandler';
import SearchBar from '../components/SearchBar';
import {Button, CircularProgress, Grid} from "@mui/material";
import '../pages/CharactersPageStyle.css'
import CharacterCards from "../components/CharacterCards";
import CustomSpinner from "../components/CustomSpinner";

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

    if (!characters) {
        return <CustomSpinner/>
    }

    return (
        <>
            <h1 className="mt-3">Rickipedia</h1>
            <SearchBar onSearch={searchCharacters}/>
            <Grid
                container
                justifyContent="center"
            >
                <CharacterCards characters={characters}/>
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
