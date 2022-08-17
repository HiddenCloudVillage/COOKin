import React, { useContext } from 'react';
import styled from 'styled-components';
import EditIngredient from './EditIngredient';
import IncludeContext from '../IncludeContext';
import ExcludeContext from '../ExcludeContext';

function IngredientTile({ ingredient, ingredientInfo, setCurrentPage }) {
  const [includeIngredients, setIncludeIngredients] =
    useContext(IncludeContext);
  const [excludeIngredients, setExcludeIngredients] =
    useContext(ExcludeContext);

  function handleItems() {
    setIncludeIngredients([ingredient]);
    setExcludeIngredients([]);
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
