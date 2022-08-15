import React from 'react';
import styled from 'styled-components';
import IngredientTile from './IngredientTile';

function IngredientList({ pantry }) {
  const ingredientNames = Object.keys(pantry);
  return (
    <div>
      {pantry
      && ingredientNames.map((ingredient) => (
        <IngredientTile
          ingredient={ingredient}
          key={ingredient}
          ingredientInfo={pantry[ingredient]}
        />
      ))}
    </div>
  );
}

export default IngredientList;
