import React, {useEffect, useState} from 'react';
import {fetchData} from '../../api/apiHandler';
import SearchBar from '../../components/searchBar/SearchBar';
import {Button, Grid} from "@mui/material";
import CharacterCards from "../../components/characterCards/CharacterCards";
import CustomSpinner from "../../components/customSpinner/CustomSpinner";
import './CharactersPage.css';

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
            <h1 align='center'>Rickipedia</h1>
            <SearchBar onSearch={searchCharacters}/>
            <Grid
                container
                justifyContent="center"
            >
                <CharacterCards characters={characters}/>
            </Grid>
            <div align='center'>
                <Button
                    color='success'
                    variant="contained"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className='pagination-buttons'
                >
                    Prev
                </Button>
                {currentPage} / {totalPages}
                <Button
                    color='success'
                    variant="contained"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className='pagination-buttons'
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default CharactersPage;
