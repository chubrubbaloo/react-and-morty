import React, {useState} from 'react';
import {TextField} from "@mui/material";

export default function SearchBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);

    }

    const handleKeyPressed = (e) => {
        if (e.key === "Escape") {
            setSearchTerm('')
            onSearch('')
        }
    }

    return (
        <>
            <TextField
                className="m-3"
                style={{width: "25%"}}
                id="outlined-helperText"
                label="Search Characters"
                defaultValue="Default Value"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPressed}
            >
            </TextField>
        </>

    )
}
