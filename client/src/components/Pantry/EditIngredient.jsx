import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import EditForm from './EditForm';
import UserIdContext from '../UserIdContext';

const axios = require('axios');

function EditIngredient({ ingredient, ingredientInfo }) {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useContext(UserIdContext);

  function handleDelete() {
    delete userInfo.pantry[ingredient];
    axios({
      method: 'put',
      url: '/pantry',
      data: userInfo,
    })
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <Edit>
      {show && (
      <EditForm
        setShow={setShow}
        ingredient={ingredient}
        ingredientInfo={ingredientInfo}
      />
      )}
      <Button type="button" onClick={() => setShow(true)}>
        Edit
      </Button>
      <Button type="button" onClick={handleDelete}>
        Delete
      </Button>
    </Edit>
  );
}

export default EditIngredient;

const Edit = styled.div`
  width: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  height: auto;
  width: 45%;
  min-width: 50px;
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
