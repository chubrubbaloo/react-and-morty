import React, {useEffect, useState} from 'react';
import {fetchData} from '../../api/apiHandler';
import SearchBar from '../../components/searchBar/SearchBar';
import {Grid, Typography} from "@mui/material";
import CustomSpinner from "../../components/customSpinner/CustomSpinner";
import './CharactersPage.css';
import CharacterCards from "../../components/characterCards/CharacterCards";
import CustomPagination from "../../components/customPagination/CustomPagination";
import {Character} from "../../interfaces/Character";

interface Props {
    characters: Character[];
}

const CharactersPage: React.FC<Props> = () => {
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

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

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
            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default CharactersPage;
