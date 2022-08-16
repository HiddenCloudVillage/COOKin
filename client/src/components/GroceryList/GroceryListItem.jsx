/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import styled from 'styled-components';

function GroceryListItem({
  removeFromList,
  updateUserInfo,
  ingredient,
  pantry,
}) {
  const [tempIng, setTempIng] = useState(ingredient);
  const [flag, setFlag] = useState(true);

  const pantryArray = pantry ? Object.keys(pantry) : [];

  function toggleStriked() {
    updateUserInfo(ingredient.name);
  }

  if (pantryArray.includes(ingredient.name) && flag) {
    setTempIng({ ...tempIng, stateShopped: true });
    setFlag(false);
  }

  return (
    <ListItem>
      {!tempIng.stateShopped ? (
        <span
          onClick={() => {
            toggleStriked();
            setTempIng({ ...tempIng, stateShopped: true });
          }}
          onKeyPress={() => toggleStriked()}
        >
          {ingredient.name}
        </span>
      ) : (
        <span>
          <strike
            onClick={() => {
              setTempIng({ ...tempIng, stateShopped: false });
              toggleStriked();
            }}
            onKeyPress={() => toggleStriked()}
          >
            {ingredient.name}
          </strike>
        </span>
      )}
      <button
        onClick={(event) => removeFromList(ingredient.name, event)}
        type="submit"
      >
        X
      </button>
    </ListItem>
  );
}

export default GroceryListItem;

const ListItem = styled.div`
width: 70%;
min-height: 5%;
height: 5vh;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
padding-left: 10px;
background-color: #ffffff;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
margin-bottom: 10px;
cursor: pointer;
transition: all 0.3s ease-in-out;
&:hover {
  transform: scale(1.01);
}
`;
