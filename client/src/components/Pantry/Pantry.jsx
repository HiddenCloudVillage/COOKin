import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import UserIdContext from '../UserIdContext';
import Recs from './Recs';

function Pantry({ setCurrentPage, recipes }) {
  const [userInfo, setUserInfo] = useContext(UserIdContext);
  useEffect(() => {}, [userInfo]);
  return (
    <Page>
      {userInfo.pantry && Object.keys(userInfo.pantry).length > 0 ? (
        <IngredientList
          pantry={userInfo.pantry}
          userInfo={userInfo}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div>Pantry Empty please enter items</div>
      )}
      {/* <AddIngredient userInfo={userInfo} setUserInfo={setUserInfo} /> */}
      <Recs
        userInfo={userInfo}
        recipes={recipes}
        setCurrentPage={setCurrentPage}
        setUserInfo={setUserInfo}
      />
    </Page>
  );
}

export default Pantry;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;
