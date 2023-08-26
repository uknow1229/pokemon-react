import React from 'react';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from '../utils/pokemon';
import styled from 'styled-components';
import Card from './Card/Card';

function Home() {
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
      loadPokemon(res?.results);
      // console.log('res.results', res.results);
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
    console.log('_pokemonData', _pokemonData);
    setPokemonData(_pokemonData);
  };

  const StyledBody = styled.body`
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(228, 233, 252);
  `;

  const StyledApp = styled.div`
    text-align: center;
    width: 100%;
    // height: 100vh;
  `;

  const StyledPokemonCardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    gap: 20px;
    padding-top: 20px;
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
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    console.log('next: data', data);
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
    <StyledBody>
      <StyledApp>
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <StyledPokemonCardContainer>
              {pokemonData.map((pokemon, i) => {
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
      ;
    </StyledBody>
  );
}

export default Home;
