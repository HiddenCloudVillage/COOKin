import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

function Pantry({ userInfo, setUserInfo }) {
  const [updatePantry, setUpdatePantry] = useState();
  useEffect(() => {
    setUpdatePantry(false);
  }, [updatePantry]);
  return (
    <div>
      this is the pantry!
      {Object.keys(userInfo.pantry).length > 0 ? (
        <IngredientList
          pantry={userInfo.pantry}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setUpdatePantry={setUpdatePantry}
        />
      ) : (
        <div>Pantry Empty please enter items</div>
      )}
      <AddIngredient
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        setUpdatePantry={setUpdatePantry}
      />
    </div>
  );
}

export default Pantry;
