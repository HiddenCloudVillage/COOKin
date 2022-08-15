import React from 'react';
import styled from 'styled-components';

function GroceryListItem({ ingredient, pantry }) {
  let pantryArray = Object.keys(pantry);
  console.log(ingredient, pantryArray);
  return (
    <div>
      <span>{ingredient}</span>
    </div>
  );
}

export default GroceryListItem;
