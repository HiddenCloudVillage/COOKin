import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import UserIdContext from '../UserIdContext';

const axios = require('axios');

function EditForm({ ingredient, ingredientInfo, setShow }) {
  const [name, setName] = useState(ingredient);
  const [amount, setAmount] = useState(ingredientInfo.q);
  const [category, setCategory] = useState(ingredientInfo.c);
  const [expiration, setExpiration] = useState(ingredientInfo.e);
  const [userInfo, setUserInfo] = useContext(UserIdContext);

  const handleOuterClick = (e) => {
    if (e.target.id === 'editformouter') {
      setShow(false);
    }
  };

  function handleEdit() {
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
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <FormOuter id="editformouter" onClick={handleOuterClick}>
      <FormInner>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
            setShow(false);
          }}
        >
          <Label>
            Ingredient :
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          <Label>
            Amount :
            <input
              type="number"
              name="amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </Label>
          <Label>
            Category :
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Label>
          <Label>
            Expiration :
            <DateInput
              type="date"
              name="expiration"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Label>
          <Button type="submit">update</Button>
        </Form>
      </FormInner>
    </FormOuter>
  );
}

export default EditForm;

const DateInput = styled.input`
  font-size: inherit;
  font: inherit;
`;

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
