import React from 'react';
import styled from 'styled-components';
import IngredientTile from './IngredientTile';

function IngredientList({ pantry, userInfo, setCurrentPage }) {
  const ingredientNames = Object.keys(pantry);
  return (
    <IngListContainer>
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
    </IngListContainer>
  );
}

export default IngredientList;

const IngListContainer = styled.div`
  display: flex;
  width: 100%;
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
