import React, { useState } from 'react';
import styled from 'styled-components';
import IngredientForm from './IngredientForm';

function AddIngredient({ userInfo, setUserInfo, setUpdatePantry }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <IngredientForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setUpdatePantry={setUpdatePantry}
          setShow={setShow}
        />
      ) : (
        <button type="button" onClick={() => setShow(true)}>
          Add Ingredient
        </button>
      )}
    </div>
  );
}

export default AddIngredient;
