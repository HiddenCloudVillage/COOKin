import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import InstructionsButton from '../InstructionsButton';

function GroceryForm({
  setUserInfo,
  setAlteredGroceryList,
  alteredGroceryList,
  userInfo,
  setShow,
}) {
  const [newItem, setNewItem] = useState('');

  const handleOuterClick = (e) => {
    if (e.target.id === 'grocformouter') {
      setShow(false);
    }
  };

  function addUserInput(event) {
    const arrayNames = userInfo.groceryList.map((ing) => ing?.name.toLowerCase());

    if (newItem === '' || arrayNames.includes(newItem.toLowerCase())) {
      return;
    }
    event.preventDefault();

    const newList = alteredGroceryList;
    newList.push({ name: newItem, shopped: false });

    axios
      .put('/grocery', { grocery: newList, userId: userInfo.userId })
      .then((res) => setUserInfo(res.data))
      .then(() => setNewItem(''))
      .catch((err) => console.log(err));
    setShow(false);
  }

  return (
    <FormOuter id="grocformouter" onClick={handleOuterClick}>
      <FormInner>
        <h3>Add To List</h3>
        <InstructionsButton text="To add a new ingredient, simply type in the ingredient and click 'Add Item'." />
        <TextField
          value={newItem}
          placeholder="enter item"
          onChange={(event) => setNewItem(event.target.value)}
        />
        <Button onClick={addUserInput} type="submit">
          Add Item
        </Button>
      </FormInner>
    </FormOuter>
  );
}

export default GroceryForm;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const FormOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  overflow: auto;
  background-color: ${(props) => props.theme.bgmodal1};
  background-color: ${(props) => props.theme.bgmodal2};
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;

const FormInner = styled.div`
  display: flex;
  z-index: 201;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  opacity: 1;
  width: 90vw;
  height: 90vw;
  max-width: 400px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props) => props.theme.tilebg1};
  border: .5px solid;
  border-radius: 10px;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Label = styled.label`
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  height: auto;
  width: 45%;
  border-radius: 10px;
  border: 1px solid;
  padding: 3px;
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
