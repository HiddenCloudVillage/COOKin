import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
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

  const handleOuterClick = (e) => {
    if (e.target.id === 'addformouter') {
      setShow(false);
    }
  };

  function handleSubmit() {
    if (userInfo.pantry === undefined) {
      userInfo.pantry = {};
    }
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
    <FormOuter id="addformouter" onClick={handleOuterClick}>
      <FormInner>
        <Form
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
          <Label>
            Amount :
            <input
              type="number"
              name="amount"
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </Label>
          <Label>
            Category :
            <input
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Label>
          <Label>
            Expiration :
            <input
              type="text"
              name="expiration"
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Label>
          <input type="submit" />
        </Form>
      </FormInner>
    </FormOuter>
  );
}

export default IngredientForm;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const FormOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
`