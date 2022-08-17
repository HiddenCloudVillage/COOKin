import React, { useState, useContext } from 'react';
import EditForm from './EditForm';
import UserIdContext from '../UserIdContext';
import styled from 'styled-components';

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
      {show && <EditForm
          setShow={setShow}
          ingredient={ingredient}
          ingredientInfo={ingredientInfo}
        />}
      <button type="button" onClick={() => setShow(true)}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
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