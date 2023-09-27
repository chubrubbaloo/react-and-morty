import React, { useState } from 'react';
export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    }

    return (
        <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="input-group" style={{width: '80%'}}>
                <input
                    type="text"
                    className="form-control"
                    aria-label="Search for a character"
                    placeholder="Search for a character..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
