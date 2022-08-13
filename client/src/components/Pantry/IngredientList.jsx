import React from 'react';
import styled from 'styled-components';
import IngredientTile from './IngredientTile';

function IngredientList() {
  return (
    <div>
      this is the ingredient list.
      holds ingredients
      <IngredientTile />
      <IngredientTile />
      <IngredientTile />
    </div>
  );
}

export default IngredientList;
