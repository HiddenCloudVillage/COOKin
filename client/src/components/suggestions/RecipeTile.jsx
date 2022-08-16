import React from 'react';
import styled from 'styled-components';

export default function RecipeTile({ recipe, setOpen, i }) {
  return (
    <Tile onClick={() => setOpen(i)}>
      <Name>{recipe.name}</Name>
      <h2>{recipe.percent}%</h2>
    </Tile>
  );
}
const Tile = styled.div`
  width: 80%;
  min-height: 5%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  background: ${(props) => props.theme.maintilebg};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;
const Name = styled.h3`
  top: -40%;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${(props) => props.theme.maintilebg};
  margin-bottom: 0;
  &:hover {
    text-decoration: underline;
    color: #ff0000;
  }
`;
