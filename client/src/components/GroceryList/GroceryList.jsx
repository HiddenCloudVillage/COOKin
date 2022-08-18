import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import GroceryForm from './GroceryForm';
import GroceryListItem from './GroceryListItem';
import GroceryStore from './GroceryStore';
import InstructionsButton from '../InstructionsButton';

function GroceryList({ userInfo, setUserInfo }) {
  const [alteredGroceryList, setAlteredGroceryList] = useState([]);

  const groceryListSet = new Set(userInfo.groceryList);
  const groceryListArray = Array.from(groceryListSet);

  const [show, setShow] = useState(false);

  function setGroceryList(newList) {
    const groceryListProp = [];

    const arrayNames = userInfo.groceryList.map((ing) => ing?.name);

    newList.forEach((item) => {
      if (arrayNames.includes(item) || item === null) {
        return;
      }
      if (item?.shopped === undefined) {
        const temp = {};
        temp.name = item;
        temp.shopped = false;
        groceryListProp.push(temp);
      } else {
        groceryListProp.push(item);
      }
    });
    setAlteredGroceryList(groceryListProp);
  }

  useEffect(() => {
    setGroceryList(groceryListArray);
  }, [userInfo]);

  function updateUserInfo(name) {
    const tempList = [];

    alteredGroceryList.forEach((item) => {
      const tempObj = {};
      if (item.name === name) {
        tempObj.name = item.name;
        tempObj.shopped = !item.shopped;
      } else {
        tempObj.name = item.name;
        tempObj.shopped = item.shopped;
      }
      tempList.push(tempObj);
    });

    const axiosObj = { grocery: tempList, userId: userInfo.userId };
    axios
      .put('/grocery', axiosObj)
      .then((res) => setAlteredGroceryList(res.data.groceryList))
      .catch((err) => console.log(err));

    const pantryArray = userInfo.pantry ? Object.keys(userInfo.pantry) : [];
    if (!pantryArray.includes(name)) {
      const additionalPantryItem = name;
      const newPantryItem = userInfo.pantry ? { ...userInfo.pantry } : {};
      newPantryItem[additionalPantryItem] = { q: '', c: '', e: '' };
      axios
        .put('/pantry', { pantry: newPantryItem, userId: userInfo.userId })
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.log(err));
    } else {
      const additionalPantryItem = name;
      const newPantryItem = { ...userInfo.pantry };
      delete newPantryItem[additionalPantryItem];
      axios
        .put('/pantry', { pantry: newPantryItem, userId: userInfo.userId })
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.log(err));
    }
  }

  function removeFromList(name, event) {
    event.preventDefault();
    const tempList = [];

    alteredGroceryList.forEach((item) => {
      if (item.name !== name) {
        tempList.push(item);
      }
    });

    const axiosObj = { grocery: tempList, userId: userInfo.userId };
    axios
      .put('/grocery', axiosObj)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }

  function clearFullList(event) {
    event.preventDefault();
    const tempList = [];

    const axiosObj = { grocery: tempList, userId: userInfo.userId };
    axios
      .put('/grocery', axiosObj)
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Page>
      <Left>
        <Top>
          <TopLeft>
            <Title>Here is your grocery list.</Title>
            <InstructionsButton text="1. Ingredients on the list will be automatically crossed off your list if they already exist in your pantry.?
            2. To cross an item out on the list and add to your pantry, simply click the ingredient name.?
            3. To un-cross the ingredient and remove from the pantry, simply click the ingredient name.?
            4. To remove an item completely from your list, click the 'X' at the right of the list item."
            />
          </TopLeft>
          <Buttons>
            <Button onClick={clearFullList} type="submit">
              Clear List
            </Button>
            <Button onClick={() => setShow(true)}>Add</Button>
          </Buttons>
        </Top>
        <GroceryListCont>
          {userInfo.groceryList
              && alteredGroceryList.map((ingredient) => (
                <GroceryListItem
                  removeFromList={removeFromList}
                  updateUserInfo={updateUserInfo}
                  pantry={userInfo.pantry}
                  ingredient={ingredient}
                  key={ingredient.name}
                />
              ))}
        </GroceryListCont>

      </Left>
      <Right>
        {show && (
        <GroceryForm
          setAlteredGroceryList={setAlteredGroceryList}
          userInfo={userInfo}
          alteredGroceryList={alteredGroceryList}
          setUserInfo={setUserInfo}
          setShow={setShow}
        />
        )}
        <MapDiv>
          <GroceryStore />
        </MapDiv>
      </Right>
    </Page>
  );
}

export default GroceryList;

const GroceryListCont = styled.div`
  margin-top: 3%;
  width: 100%;
`;

const Left = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Right = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const MapDiv = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;

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

const Buttons = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
const TopLeft = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  height: auto;
  width: 45%;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.buttontext};
  background-color: ${(props) => props.theme.button2};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;
