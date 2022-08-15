import React, { useState } from 'react';
import styled from 'styled-components';

function GroceryListItem({ removeFromList, updateUserInfo, ingredient, pantry }) {
  const [tempIng, setTempIng] = useState(ingredient);
  const [flag, setFlag] = useState(true);

  const pantryArray = pantry ? Object.keys(pantry) : [];

  function toggleStriked() {
    updateUserInfo(ingredient.name);
  }

  if (pantryArray.includes(ingredient.name) && flag) {
    setTempIng({ ...tempIng, shopped: true });
    setFlag(false);
  }

  return (
    <div>
      {!tempIng.shopped ? (
        <span
          onClick={() => {
            toggleStriked()
            setTempIng({ ...tempIng, shopped: true })
          }}
          onKeyPress={() => toggleStriked()}
        >
          {ingredient.name}
        </span>
      ) : (
        <span>
          <strike
            onClick={() => {
              setTempIng({ ...tempIng, shopped: false })
              toggleStriked()
            }}
            onKeyPress={() => toggleStriked()}
          >
            {ingredient.name}
          </strike>
        </span>
      )}
      <button onClick={() => removeFromList(ingredient.name)}>X</button>
    </div>
  );
}

export default GroceryListItem;
