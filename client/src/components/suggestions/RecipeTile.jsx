import React from 'react';
import styled from 'styled-components';

export default function RecipeTile({ recipe, setOpen, i }) {
  return (
    <Tile onClick={() => setOpen(i)}>
      <Name>{recipe.name}</Name>
      <Perc>{recipe.percent}%</Perc>
    </Tile>
  );
}
const Tile = styled.div`
  width: 100%;
  min-height: 5%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  background: ${(props) => props.theme.tilebg1};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    opacity: 0.7;
  }
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  background: ${(props) => props.theme.tilebg1};
  margin: 0;
`;

const Perc = styled(Name)`

`;
