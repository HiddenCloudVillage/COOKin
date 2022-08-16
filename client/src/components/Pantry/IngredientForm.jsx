import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Autocomplete, TextField } from '@mui/material/';
import ingredient from '../../lib/ingredients';
import UserIdContext from '../UserIdContext';

const axios = require('axios');
// some sort of modal for inserting ingredient

function IngredientForm({ setShow }) {
  const [userInfo, setUserInfo] = useContext(UserIdContext);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [expiration, setExpiration] = useState();

  function handleSubmit() {
    const newUserInfo = userInfo;
    newUserInfo.pantry[name] = {
      q: Number(amount),
      c: category,
      e: expiration,
    };
    axios({
      method: 'put',
      url: '/pantry',
      data: newUserInfo,
    })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setShow(false);
      }}
    >
      <Autocomplete
        options={ingredient}
        sx={{ width: 300 }}
        autoHighlight
        renderInput={(params) => <TextField {...params} label="Name" />}
        onChange={(e, newInputValue) => {
          setName(newInputValue);
        }}
      />
      <label>
        Amount :
        <input
          type="integer"
          name="amount"
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Category :
        <input
          type="text"
          name="category"
          required
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Expiration :
        <input
          type="text"
          name="expiration"
          required
          onChange={(e) => setExpiration(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default IngredientForm;
