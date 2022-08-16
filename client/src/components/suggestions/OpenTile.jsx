// OpenTile React component
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import RecipeModal from './RecipeModal';

export default function OpenTile({ userInfo, recipe, setUserInfo }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleAddToList = () => {
    const set = new Set(userInfo.groceryList);
    recipe.ingredients.forEach((ingredient) => {
      set.add(ingredient.ingredientName);
    });
    const newList = Array.from(set);
    const newUserInfo = { ...userInfo, grocery: newList };
    axios.put('/grocery', newUserInfo).then((res) => { setUserInfo(res.data); })
      .then(() => alert('Recipe added to grocery list'));
  };
  if (openModal) {
    return (
      <RecipeModal
        recipe={recipe}
        setOpenModal={setOpenModal}
        handleAddToList={handleAddToList}
      />
    );
  }

  return (
    <Tile>
      <Name onClick={() => setOpenModal(true)}>{recipe.name}</Name>
      <TileBot>
        <Thumbnail src={recipe.thumbnail} alt={recipe.name} />
        <BotRight>
          <Perc>
            {recipe.percent}
            %
            <Sp>match of the ingredients in your pantry</Sp>
          </Perc>
          <AddToGroceryList
            onClick={handleAddToList}
            recipe={recipe}
          >
            Add ingredients to your grocery list!

          </AddToGroceryList>
        </BotRight>
      </TileBot>
      {/* <div>
        You have
        <h3>
          {recipe.percent}
          %
        </h3>
        of the needed ingredients.
      </div> */}

      {/* <Ingredients>
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.slice(0, 6).map((ingredient) => (
            <li key={ingredient.ingredientName}>
              {ingredient.ingredientName}
              {' '}
              /
              {' '}
              {ingredient.ingredientQuantity}
            </li>
          ))}
        </ul>
        {recipe.ingredients.length > 6 && (
        <div>
          Visit the recipe page to see all ingredients!
        </div>
        )}
      </Ingredients> */}

    </Tile>
  );
}
const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 85%;
  min-height: 250px;
  padding: 2%;
  background: ${(props) => props.theme.maintilebg};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;

const TileBot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const BotRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Perc = styled.p`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
const Sp = styled.span`
  margin: 0;
  font-size: 15px;
  font-weight: normal;
`;

const Thumbnail = styled.img`
  width: 30%;
  resize: auto;
  margin-right: 3%;
`;
const Ingredients = styled.div`
  height: 100%;
  width: 40%;
  border-radius: 10px;
`;
const AddToGroceryList = styled.button`

  height: 20%;
  width: 20%;
  border-radius:5%;

  background: ${(props) => props.theme.maintilebg};
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;
const Name = styled.h3`
  font-weight: bold;
  display:block;
  background: ${(props) => props.theme.maintilebg};
  margin: 0;
  margin-bottom: 2%;
  width: auto;
  overflow: auto;
  border-bottom: 1px solid;
  /* &:hover {
    text-decoration: underline;
    color: #ff0000;
  } */
`;
