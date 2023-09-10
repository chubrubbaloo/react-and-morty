import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        // set the search term to the input field
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        // call the search function as the user types in the input field
        onSearch(newSearchTerm);
    }

    return (
        <div>
            <input
                type='text'
                placeholder='Search for a character...'
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    )
}
