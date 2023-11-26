import React, {useEffect, useState} from 'react';
import {fetchData} from '../../api/apiHandler';
import SearchBar from '../../components/searchBar/SearchBar';
import {Button, Grid, Typography} from "@mui/material";
import CustomSpinner from "../../components/customSpinner/CustomSpinner";
import './CharactersPage.css';
import CharacterCards from "../../components/characterCards/CharacterCards";

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
}

const CharactersPage: React.FC = () => {
    const initialPage = parseInt(localStorage.getItem('currentPage') || '1');

    const [characters, setCharacters] = useState<Character[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        async function fetchCharacters(page: number) {
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
            window.scrollTo(0, 0);
        }
    }

    const searchCharacters = async (characterName: string) => {
        try {
            const data = await fetchData(`character/?name=${characterName}`);
            setCharacters(data.results);
        } catch (error) {
            console.error('Error searching character:', error);
        }
    }

    if (!characters) {
        return <CustomSpinner/>;
    }

    return (
        <>
            <Typography align='center'>
                <h1>Rickipedia</h1>
            </Typography>
            <SearchBar onSearch={searchCharacters}/>
            <Grid
                container
                justifyContent="center"
            >
                <CharacterCards characters={characters}/>
            </Grid>
            <div className='center-content'>
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
