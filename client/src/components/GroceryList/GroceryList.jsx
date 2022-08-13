import React from 'react';
import styled from 'styled-components';
import GroceryForm from './GroceryForm';
import GroceryListItem from './GroceryListItem';

function GroceryList({ userInfo, setUserInfo }) {
  console.log(userInfo);

  return (
    <div>
      this is the grocery list!
      <GroceryForm />
      THIS IS THE GROCERY LIST BITCHES
      {userInfo.groceryList
        && userInfo.groceryList.map((ingredient) => (
          <GroceryListItem pantry={userInfo.pantry} ingredient={ingredient} key={ingredient} />
        ))}
    </div>
  );
}

export default GroceryList;
