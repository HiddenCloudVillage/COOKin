import React from 'react';
import styled from 'styled-components';
import EditIngredient from './EditIngredient';

function IngredientTile({ ingredient, ingredientInfo, userInfo, setUserInfo }) {
  return (
    <div>
      <span>{ingredient}</span>
      <span>{ingredientInfo.q}</span>
      <span>{ingredientInfo.c}</span>
      <span>{ingredientInfo.e}</span>
      <EditIngredient
        ingredient={ingredient}
        ingredientInfo={ingredientInfo}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}

export default IngredientTile;
