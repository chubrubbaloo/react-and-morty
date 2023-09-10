import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        onSearch(searchTerm);
    }

    return (
        <div>
            <input
                type='text'
                placeholder='Search for a character...'
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}
