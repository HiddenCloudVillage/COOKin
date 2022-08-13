import React from 'react';
import styled from 'styled-components';

function GroceryListItem({ ingredient, pantry }) {
  console.log(ingredient, pantry);
  return (
    <div>
      <span>{ingredient}</span>
    </div>
  );
}

export default GroceryListItem;
