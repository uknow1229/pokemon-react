import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // 追加
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
