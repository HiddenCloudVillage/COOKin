import React, { useContext } from 'react';
import styled from 'styled-components';
import EditIngredient from './EditIngredient';
import IncludeContext from '../IncludeContext';

function IngredientTile({ ingredient, ingredientInfo, setCurrentPage }) {
  const [includeIngredients, setIncludeIngredients] =
    useContext(IncludeContext);

  function handleItems() {
    setIncludeIngredients([ingredient]);
    setCurrentPage('Suggestions');
  }
  return (
    <div>
      <span onClick={handleItems}>{ingredient}</span>
      <span>{ingredientInfo.q}</span>
      <span>{ingredientInfo.c}</span>
      <span>{ingredientInfo.e}</span>
      <EditIngredient ingredient={ingredient} ingredientInfo={ingredientInfo} />
    </div>
  );
}

export default IngredientTile;
