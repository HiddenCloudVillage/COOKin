import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GroceryForm from './GroceryForm';
import GroceryListItem from './GroceryListItem';

function GroceryList({ userInfo, setUserInfo }) {
  const [alteredGroceryList, setAlteredGroceryList] = useState([]);

  const groceryListSet = new Set(userInfo.groceryList);
  const groceryListArray = Array.from(groceryListSet);

  function setGroceryList(newList) {
    const groceryListProp = [];
    newList.forEach((item) => {
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
    <div>
      THIS IS THE GROCERY LIST BITCHES
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
      <GroceryForm
        setAlteredGroceryList={setAlteredGroceryList}
        userInfo={userInfo}
        alteredGroceryList={alteredGroceryList}
        setUserInfo={setUserInfo}
      />
      <button onClick={clearFullList} type="submit">
        Clear List
      </button>
    </div>
  );
}

export default GroceryList;
