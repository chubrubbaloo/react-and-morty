import './App.css';
import { fetchCharacters } from './api/apiHandler';

function App() {
  fetchCharacters().then(data => console.log(data));
  return (
    <div className="App">
      <h1>React and Morty</h1>
    </div>
  );
}

export default App;
