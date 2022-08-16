import React, { useState, useContext } from 'react';
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
    <div>
      {show ? (
        <EditForm
          setShow={setShow}
          ingredient={ingredient}
          ingredientInfo={ingredientInfo}
        />
      ) : (
        <button type="button" onClick={() => setShow(true)}>
          Edit
        </button>
      )}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default EditIngredient;
