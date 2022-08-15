import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GroceryForm from './GroceryForm';
import GroceryListItem from './GroceryListItem';

function GroceryList({ userInfo, setUserInfo }) {
  const [alteredGroceryList, setAlteredGroceryList] = useState([]);
  console.log(userInfo);

  const groceryListSet = new Set(userInfo.groceryList);
  const groceryListArray = Array.from(groceryListSet);

  function setGroceryList(newList) {
    const groceryListProp = [];
    newList.forEach((item) => {
      if (item.shopped === undefined) {
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
    // setAlteredGroceryList(tempList);
    console.log(tempList);

    const axiosObj = { grocery: tempList, userId: userInfo.userId };
    axios
      .put('/grocery', axiosObj)
      .then((res) => setAlteredGroceryList(res.data.groceryList))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      this is the grocery list!
      <GroceryForm />
      THIS IS THE GROCERY LIST BITCHES
      {userInfo.groceryList
        && alteredGroceryList.map((ingredient) => (
          <GroceryListItem
            updateUserInfo={updateUserInfo}
            pantry={userInfo.pantry}
            ingredient={ingredient}
            key={ingredient.name}
          />
        ))}
    </div>
  );
}

export default GroceryList;
