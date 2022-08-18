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
        <Button type="button" onClick={() => setShow(true)}>
          Add Ingredient
        </Button>
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

const Button = styled.button`
  height: auto;
  width: 100%;
  min-width: 90px;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.button1};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;