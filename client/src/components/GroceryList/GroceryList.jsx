import React from 'react';
import styled from 'styled-components';
import GroceryTile from './GroceryTile';
import GroceryForm from './GroceryForm';

function GroceryList() {
  return (
    <div>
      this is the grocery list!
      <GroceryForm />
      holds grocery tiles
      <GroceryTile />
      <GroceryTile />
      <GroceryTile />
    </div>
  );
}

export default GroceryList;
