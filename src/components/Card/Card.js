import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  color: black;
  text-decoration: none;
`;

const StyledCardInfo = styled.div`
  text-align: center;
  color: black;
`;
const StyledCardType = styled.div``;
const StyledCardData = styled.div``;
const StyledCardText = styled.p``;
const Card = ({ pokemon }) => {
  // console.log('pokemon', pokemon);

  return (
    <StyledCard>
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className="cardImg">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>
        <StyledCardName>{pokemon.name}</StyledCardName>
        <StyledCardInfo>
          <StyledCardType>
            <p>タイプ</p>
            {pokemon.types.map((type) => {
              return (
                <div key={type.type.name}>
                  <span className="typeName">{type.type.name}</span>
                </div>
              );
            })}
          </StyledCardType>

          <StyledCardData>
            <StyledCardText>重さ：{pokemon.weight}</StyledCardText>
          </StyledCardData>
          <StyledCardData>
            <StyledCardText>高さ：{pokemon.height}</StyledCardText>
          </StyledCardData>
          <StyledCardData>
            <StyledCardText>
              アビリティ：{pokemon.abilities[0].ability.name}
            </StyledCardText>
          </StyledCardData>
        </StyledCardInfo>
      </Link>
    </StyledCard>
  );
};

export default Card;
