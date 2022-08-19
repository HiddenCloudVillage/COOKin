import React, { useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import IngredientList from './IngredientList';
import UserIdContext from '../UserIdContext';
import Recs from './Recs';
import InstructionsButton from '../InstructionsButton';

function Pantry({ setCurrentPage, recipes }) {
  const [userInfo, setUserInfo] = useContext(UserIdContext);
  useEffect(() => { }, [userInfo]);
  if (userInfo.pantry === undefined) {
    userInfo.pantry = {};
  }
  return (
    <Page>
      <Left>
        <Top>
          {Object.keys(userInfo.pantry).length > 0
            ? <Title>Here is your grocery list.</Title>
            : <Title>Here is your grocery list. Please add new items.</Title>}
          <InstructionsButton text="Here is a list of items in your pantry.\? To manually add an item, click the 'Add Ingredient' button and either type or select from the ingredient options.? The amount, category, and expiration dates are optional inputs that you can also select.? Ingredients that are within 3 days of the expiration date will be highlighted in red." />
        </Top>
        <Main>
          {userInfo.pantry && Object.keys(userInfo.pantry).length > 0 ? (
            <IngredientList
              pantry={userInfo.pantry}
              userInfo={userInfo}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <div>
              <IngredientList
                pantry={userInfo.pantry}
                userInfo={userInfo}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </Main>
      </Left>
      <Right>
        <Top>
          <Title>
            Recommendations
          </Title>
          <InstructionsButton text="Here is a list of recipes that you almost have all of the ingredients for.? By clicking the recipe, you can see what ingredients you are still missing. ?Click 'view' to view the entire recipe." />
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
    </Page >
  );
}

export default Pantry;

const Main = styled.div`
  margin-top: 3%;
  width: 100%;
`;

const Left = styled.div`
  width: 50%;
  min-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Right = styled.div`
  margin-left: 2%;
  width: 40%;
  min-width: 400px;
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
  justify-content: flex-start;
`;

const Title = styled.p`
  font-size: 20px;
  margin: 0;
  margin-right: 1%;
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
