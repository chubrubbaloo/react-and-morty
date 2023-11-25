import React from 'react';
import styles from '../src/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailPage from './pages/CharacterDetailPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CharactersPage/>}/>
                    <Route path="/:page" element={<CharactersPage/>}/>
                    <Route path="/character/:id" element={<CharacterDetailPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
