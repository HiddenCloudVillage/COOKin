import React, { useState } from 'react';
import styled from 'styled-components';
import IngredientForm from './IngredientForm';

function AddIngredient({ userInfo, setUserInfo }) {
  const [show, setShow] = useState(false);
  return (
    <Add>
      {show ? (
        <IngredientForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setShow={setShow}
        />
      ) : (
        <button type="button" onClick={() => setShow(true)}>
          Add Ingredient
        </button>
      )}
    </Add>
  );
}

export default AddIngredient;

const Add = styled.div`
  width: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;