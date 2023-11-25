import React, {useState} from 'react';
import {TextField} from "@mui/material";
import './SearchBar.css';

interface Props {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleInputChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    }

    const handleKeyPressed = (e: any) => {
        if (e.key === "Escape") {
            setSearchTerm('');
            onSearch('');
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
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPressed}
            />
        </div>
    );
}

export default SearchBar;
