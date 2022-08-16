import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import UserIdContext from '../UserIdContext';

function Pantry({ setCurrentPage }) {
  const [userInfo, setUserInfo] = useContext(UserIdContext);
  useEffect(() => {}, [userInfo]);
  return (
    <div>
      this is the pantry!
      {userInfo.pantry && Object.keys(userInfo.pantry).length > 0 ? (
        <IngredientList
          pantry={userInfo.pantry}
          userInfo={userInfo}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div>Pantry Empty please enter items</div>
      )}
      <AddIngredient userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default Pantry;
