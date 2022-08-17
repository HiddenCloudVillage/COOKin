import { TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function GroceryForm({
  setUserInfo,
  setAlteredGroceryList,
  alteredGroceryList,
  userInfo,
}) {
  const [newItem, setNewItem] = useState('');

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
  }

  return (
    <div>
      <h3>Add To List</h3>
      <TextField
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button onClick={addUserInput} type="submit">
        Add Item
      </button>
    </div>
  );
}

export default GroceryForm;

