import React, { useState } from 'react';
import styled from 'styled-components';

function GroceryListItem({ updateUserInfo, ingredient, pantry }) {
  const pantryArray = Object.keys(pantry);
  console.log(ingredient, pantryArray);
  const [tempIng, setTempIng] = useState(ingredient);
  const [flag, setFlag] = useState(true);

  function toggleStriked() {
    updateUserInfo(ingredient.name);
  }

  if (pantryArray.includes(ingredient.name) && flag) {
    setTempIng({ ...tempIng, shopped: true });
    setFlag(false);
  }

  return (
    <div>
      {!ingredient.shopped && !tempIng.shopped ? (
        <span
          onClick={() => toggleStriked()}
          onKeyPress={() => toggleStriked()}
        >
          {ingredient.name}
        </span>
      ) : (
        <span>
          <strike
            onClick={() => toggleStriked()}
            onKeyPress={() => toggleStriked()}
          >
            {ingredient.name}
          </strike>
        </span>
      )}
    </div>
  );
}

export default GroceryListItem;
