import React, { useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import IngredientList from './IngredientList';
import AddIngredient from './AddIngredient';
import UserIdContext from '../UserIdContext';

function Pantry({ setCurrentPage }) {
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
    </Page>
  );
}

export default Pantry;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
<<<<<<< HEAD
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
=======
>>>>>>> dev
`;
