import React, { useState } from 'react';
import EditForm from './EditForm';

const axios = require('axios');

function EditIngredient({
  ingredient,
  ingredientInfo,
  userInfo,
  setUserInfo,
  setUpdatePantry,
}) {
  const [show, setShow] = useState(false);

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
          userInfo={userInfo}
          setUpdatePantry={setUpdatePantry}
          setUserInfo={setUserInfo}
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
