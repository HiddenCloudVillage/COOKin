import React from 'react';
import styled from 'styled-components';
import IngredientTile from './IngredientTile';

function IngredientList({ pantry, userInfo, setUserInfo, setUpdatePantry }) {
  const ingredientNames = Object.keys(pantry);
  return (
    <div>
      {pantry &&
        ingredientNames.map((ingredient) => (
          <IngredientTile
            ingredient={ingredient}
            key={ingredient}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setUpdatePantry={setUpdatePantry}
            ingredientInfo={pantry[ingredient]}
          />
        ))}
    </div>
  );
}

export default IngredientList;
