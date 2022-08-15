import React, { useState } from 'react';
import EditForm from './EditForm';

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
    setUserInfo(userInfo);
    setUpdatePantry(true);
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
