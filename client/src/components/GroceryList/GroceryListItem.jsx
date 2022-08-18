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
        <Ing
          onClick={() => {
            toggleStriked();
            setTempIng({ ...tempIng, stateShopped: true });
          }}
          onKeyPress={() => toggleStriked()}
        >
          {ingredient.name}
        </Ing>
      ) : (
        <Ing>
          <strike
            onClick={() => {
              setTempIng({ ...tempIng, stateShopped: false });
              toggleStriked();
            }}
            onKeyPress={() => toggleStriked()}
          >
            {ingredient.name}
          </strike>
        </Ing>
      )}

      <Button
        onClick={(event) => removeFromList(ingredient.name, event)}
        type="submit"
      >
        Delete
      </Button>

    </ListItem>
  );
}

export default GroceryListItem;

const ListItem = styled.div`
  width: 96%;
  min-height: 5%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  background: ${(props) => props.theme.tilebg1};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: default;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    opacity: 0.7;
  }
`;

const Ing = styled.h3`
  font-size: 20px;
  font-weight: bold;
  background: ${(props) => props.theme.tilebg1};
  margin: 0;
`;

const DelButton = styled.button`
  width: 1.5vw;
  height: 1.5vw;
  font-color: red;
  align-content: right;
  background: transparent;
  border: solid;
  border-width: 2px;
  border-color: red;
  border-radius: 2vw;
  &:hover {
    cursor: pointer;
    border-width: 3px;
  }
`;

const Button = styled.button`
  height: auto;
  width: 15%;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.button1};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;
