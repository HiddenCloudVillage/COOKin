import React, { useEffect } from 'react';
import styled from 'styled-components';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';

function Pantry({ userInfo, setUserInfo }) {
  useEffect(() => {}, [userInfo]);
  return (
    <div>
      this is the pantry!
      {Object.keys(userInfo.pantry).length > 0 ? (
        <IngredientList
          pantry={userInfo.pantry}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ) : (
        <div>Pantry Empty please enter items</div>
      )}
      <AddIngredient userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default Pantry;
