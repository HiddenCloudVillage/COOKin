// OpenTile React component
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import RecipeModal from './RecipeModal';

export default function OpenTile({ userInfo, recipe, setUserInfo }) {
  const [openModal, setOpenModal] = React.useState(false);
  const isFavorite = userInfo.favorites.includes(recipe.mealId);
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

  const handleFavorite = () => {
    const newFavorites = userInfo.favorites.includes(recipe.mealId)
      ? userInfo.favorites.filter((id) => id !== recipe.mealId)
      : [...userInfo.favorites, recipe.mealId];
    const newUserInfo = { ...userInfo, favorites: newFavorites };
    axios.put('/favorites', newUserInfo).then((res) => { setUserInfo(res.data); }).then(() => alert('Favorites updated'));
  };

  if (openModal) {
    return (
      <RecipeModal
        recipe={recipe}
        setOpenModal={setOpenModal}
        handleAddToList={handleAddToList}
        handleFavorite={handleFavorite}
        isFavorite={isFavorite}
      />
    );
  }

  return (
    <Tile>
      <Name onClick={() => setOpenModal(true)}>{recipe.name}</Name>
      {isFavorite ? (
        <button type="button" onClick={handleFavorite}>
          Remove From Favorites
        </button>
      ) : (
        <button type="button" onClick={handleFavorite}>
          Add to Favorites
        </button>

      )}
      <div>
        You have
        <h3>
          {recipe.percent}
          %
        </h3>
        of the needed ingredients.
      </div>
      <Button
        onClick={handleAddToList}
        recipe={recipe}
      >
        Add ingredients to your grocery list!

      </Button>

      <Ingredients>
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
      </Ingredients>
      <Thumbnail src={recipe.thumbnail} alt={recipe.name} />
    </Tile>
  );
}
const Tile = styled.div`
  position: relative;
  width: 85%;
  min-height: 250px;
  height: 20vh;
  display: inline;
  padding: 10px;
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
const Thumbnail = styled.img`
  width: 15vh;
  float: right;
  top: -40%;
  position: relative;
  margin-right: 10px;
  border-radius: 10px;
`;
const Ingredients = styled.div`
position: relative;
height: 100%;
  width: 40%;
  float: left;
  border-radius: 10px;
  left: 30%;
  top : -60%;
  margin-top: 20px;
  `;
const Button = styled.button`
  position: relative;
  height: 20%;
  width: 20%;
  border-radius:5%;
  left: -40%;
  top: 10%;
  background-color: #ffffff;
  border: 1px solid #000000;
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
  background-color: gray;
  margin-top: -10px;
  width: auto;
  overflow: auto;
  margin-left: -4px; margin-right: -4px;
  padding: 10px;
  &:hover {
    text-decoration: underline;
    color: #ff0000;
  }
`;
