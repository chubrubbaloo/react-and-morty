import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchData} from '../api/apiHandler';
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import '../pages/CharacterDetailPage.css'
import CustomSpinner from "../components/CustomSpinner";

function CharacterDetailPage() {
    const {id} = useParams();
    const [character, setCharacter] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const data = await fetchData(`character/${id}`);
                setCharacter(data);
                const episodeURLs = data.episode;

                const episodePromises = episodeURLs.map(async (url) => {
                    const episodeResponse = await fetch(url);
                    if (episodeResponse.status === 200) {
                        return episodeResponse.json();
                    } else {
                        throw new Error(`Error fetching episode data. Status: ${episodeResponse.status}`);
                    }
                });

                const episodeDataArray = await Promise.all(episodePromises);

                const episodeDetails = episodeDataArray.map((episodeData) => {
                    return {
                        name: episodeData.name,
                        episode: episodeData.episode,
                        air_date: episodeData.air_date,
                    };
                });
                setEpisodes(episodeDetails);
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        }

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <CustomSpinner/>
    }

    return (
        <div>
            <img className="mt-4" src={character.image} alt={character.name}/>
            <h2 className="mt-4">{character.name}</h2>
            <TableContainer className="table-container" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className="column-title">Episode</TableCell>
                            <TableCell align='center' className="column-title">Episode Name</TableCell>
                            <TableCell align='center' className="column-title">Air Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {episodes.map((episode, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-center">{episode.episode}</TableCell>
                                <TableCell className="text-center">{episode.name}</TableCell>
                                <TableCell className="text-center">{episode.air_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CharacterDetailPage;
