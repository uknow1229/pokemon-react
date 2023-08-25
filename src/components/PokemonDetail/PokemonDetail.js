import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonDetail(data);
      } catch (error) {
        console.error('Failed to fetch the Pokemon details:', error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemonDetail) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pokemonDetail.name}</h1>
      <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
    </div>
  );
};

export default PokemonDetail;
