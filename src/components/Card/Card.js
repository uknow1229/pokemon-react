import React from 'react';
import './Card.css';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 290px;
  box-shadow: 4px 5px 18px -5px #777777;
  border-radius: 9px;
  background-color: white;
`;
const StyledCardName = styled.h3`
  padding: 0;
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 0;
`;

const StyledCardInfo = styled.div`
  text-align: center;
`;

const Card = ({ pokemon }) => {
  // console.log('pokemon', pokemon);
  return (
    <StyledCard>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <StyledCardName>{pokemon.name}</StyledCardName>
      <div className="cardType">
        <div>タイプ</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <StyledCardInfo>
        <div className="cardData">
          <p>重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p>高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </StyledCardInfo>
    </StyledCard>
  );
};

export default Card;
