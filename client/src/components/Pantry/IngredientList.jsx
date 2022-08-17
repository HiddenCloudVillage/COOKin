import React from 'react';
import styled from 'styled-components';
import IngredientTile from './IngredientTile';

function IngredientList({ pantry, userInfo, setCurrentPage }) {
  const ingredientNames = Object.keys(pantry);
  return (
    <IngListContainer>
      <IngList>
        <IngredientTile ingredient="ingredient" isHeader />
        {pantry
          && ingredientNames.map((ingredient) => (
            <IngredientTile
              ingredient={ingredient}
              key={ingredient}
              userInfo={userInfo}
              setCurrentPage={setCurrentPage}
              ingredientInfo={pantry[ingredient]}
            />
          ))}
      </IngList>
    </IngListContainer>
  );
}

export default IngredientList;

const IngListContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: flex-start;
  align-items:center;
`;
const IngList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 304px;
`;

const Buttons = styled.div`
  margin-top: 3%;
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  height: auto;
  width: 15%;
  border-radius: 5%;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.text2};
  background-color: ${(props) => props.theme.tilebg2};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;
