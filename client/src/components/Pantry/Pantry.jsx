import React, { useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import IngredientList from './IngredientList';
import UserIdContext from '../UserIdContext';
import Recs from './Recs';

function Pantry({ setCurrentPage, recipes }) {
  const [userInfo, setUserInfo] = useContext(UserIdContext);
  useEffect(() => {}, [userInfo]);
  return (
    <Page>
      <Left>
        <Top>
          <Title>Here is your grocery list.</Title>
        </Top>
        <Main>
          {userInfo.pantry && Object.keys(userInfo.pantry).length > 0 ? (
            <IngredientList
              pantry={userInfo.pantry}
              userInfo={userInfo}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <div>Pantry Empty please enter items</div>
          )}
        </Main>
      </Left>
      <Right>
        <Top>
          <Title>Recommendations</Title>
        </Top>
        <Main>
          <Recs
            userInfo={userInfo}
            recipes={recipes}
            setCurrentPage={setCurrentPage}
            setUserInfo={setUserInfo}
          />
        </Main>
      </Right>
    </Page>
  );
}

export default Pantry;

const Main = styled.div`
  margin-top: 3%;
  width: 100%;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Right = styled.div`
  margin-left: 2%;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 20px;
  margin: 0;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
  padding: 2%;
`;
