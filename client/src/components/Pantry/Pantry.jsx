import React from 'react';
import styled from 'styled-components';
import IngredientList from './IngredientList';

function Pantry({ userInfo }) {
  return (
    <div>
      this is the pantry!
      {userInfo.pantry ? (
        <IngredientList pantry={userInfo.pantry} />
      ) : (
        <div>Pantry Empty please enter items</div>
      )}
    </div>
  );
}

export default Pantry;
