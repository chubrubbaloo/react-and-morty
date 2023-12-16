import {Grid, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import './CharacterCards.css'
import {Character} from "../../interfaces/Character";

interface Props {
    characters: Character[];
}

const CharacterCards: React.FC<Props> = ({characters}) => {

    const getStatusIndicatorColor = (status: string) => {

        switch (status) {
            case "Alive":
                return `#008000`;
            case "Dead":
                return `#FF0000`;
            default:
                return `#808080`;
        }
    }

    return (
        <>
            {characters.map((character) => (
                <Grid className="grid-item text-center" key={character.id}>
                    <Link className="no-text-decoration" to={`/character/${character.id}`}>
                        <Paper elevation={2}>
                            <img src={character.image} alt={character.name}/>
                            <h2>{character.name}</h2>
                            Current status: <b> {character.status} </b> {' '}
                            <span
                                className="status"
                                style={{
                                    backgroundColor: `${getStatusIndicatorColor(character.status)}`
                                }}>
                                </span>
                            <p
                                className="bold">Species: <b>{character.species}</b></p>
                            Origin:
                            <br/>
                            <div className="pb-4"><b>{character.origin.name}</b></div>
                            <br/>
                            Last known location:
                            <br/>
                            <b>{character.location.name}</b>
                            <br/>
                            <br/>
                        </Paper>
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default CharacterCards;