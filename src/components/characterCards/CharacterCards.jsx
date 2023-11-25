import {Grid, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";
import './CharacterCards.css'


function CharacterCards({characters}) {

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

    return (
        <>
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

        </>
    )
}

export default CharacterCards;