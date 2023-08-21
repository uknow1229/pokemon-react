import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
`;

const StyledPokemonCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const StyledBtn = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledBtnTag = styled.button`
  padding: 13px 32px;
  background-color: rgb(113, 113, 185);
  border: none;
  box-shadow: 4px 5px 18px -5px #777777;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
`;

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <StyledApp>
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <StyledPokemonCardContainer>
              {pokemonData.map((pokemon, i) => {
                // console.log('pokemonData', pokemonData);
                console.log('pokemon', pokemon);
                return <Card key={i} pokemon={pokemon} />;
              })}
            </StyledPokemonCardContainer>
            <StyledBtn>
              <StyledBtnTag onClick={handlePrevPage}>前へ</StyledBtnTag>
              <StyledBtnTag onClick={handleNextPage}>次へ</StyledBtnTag>
            </StyledBtn>
          </>
        )}
      </StyledApp>
    </>
  );
}

export default App;
