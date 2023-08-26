import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled.div`
  width: 290px;
  box-shadow: 4px 5px 18px -5px #777777;
  border-radius: 9px;
  background-color: white;
  margin: auto;
  text-align: center;
  padding: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyeldBtn = styled.button`
  color: #fff;
  background: #6f61c0;
  border-radius: 30px;
  font-weight: bold;
  padding: 10px;
  border: none;

  &:hover {
    background: #8be8e5;
  }
  &:active {
    -webkit-transform: translate(0, 2px);
    -moz-transform: translate(0, 2px);
    transform: translate(0, 2px);
    border-bottom: none;
  }
`;

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  const navigate = useNavigate();

  console.log('id', id);
  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetail(data);
        console.log('data', data);
      } catch (error) {
        console.error('Failed to fetch the Pokemon details:', error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemonDetail) return <div>Loading...</div>;

  return (
    <StyledCard>
      <h1>{pokemonDetail.name}</h1>

      <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
      <img src={pokemonDetail.sprites.back_default} alt={pokemonDetail.name} />
      <br></br>
      <img src={pokemonDetail.sprites.front_shiny} alt={pokemonDetail.name} />
      <img src={pokemonDetail.sprites.back_shiny} alt={pokemonDetail.name} />
      <br></br>
      <img
        src={pokemonDetail.sprites.other.home.front_default}
        alt={pokemonDetail.name}
        width={120}
      />
      <br></br>
      <br></br>
      <img
        src={pokemonDetail.sprites.other.dream_world.front_default}
        alt={pokemonDetail.name}
        width={100}
      />
      <p>ゲーム：{pokemonDetail.game_indices[0].version.name}</p>
      <p>
        タイプ
        {pokemonDetail.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </p>
      <p>重さ：{pokemonDetail.weight}</p>
      <p>高さ：{pokemonDetail.height}</p>
      <p>アビリティ：{pokemonDetail.abilities[0].ability.name}</p>

      <StyeldBtn onClick={() => navigate(-1)}>前のページに戻る</StyeldBtn>
    </StyledCard>
  );
};

export default PokemonDetail;
