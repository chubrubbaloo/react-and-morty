import React, {useState} from 'react';
import {TextField} from "@mui/material";
import './SearchBar.css';

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
        <div style={{width: '50%', margin: 'auto'}}>
            <TextField
                className='search-bar-spacing'
                style={{width: "100%", margin: '1em'}}
                id="outlined-helperText"
                label="Search Characters"
                defaultValue="Default Value"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPressed}
            >
            </TextField>
        </div>

    )
}
