
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterPage';
import CharacterDetail from './pages/CharacterDetailPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
