import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RecipeModal from '../Suggestions/RecipeModal';

export default function RecRecipeTile({
  recipe, itemsArr, userInfo, setUserInfo, setCurrentPage,
}) {
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
      .then(() => setCurrentPage('Grocery List'));
  };

  const handleFavorite = () => {
    const newFavorites = userInfo.favorites.includes(recipe.mealId)
      ? userInfo.favorites.filter((id) => id !== recipe.mealId)
      : [...userInfo.favorites, recipe.mealId];
    const newUserInfo = { ...userInfo, favorites: newFavorites };
    axios.put('/favorites', newUserInfo).then((res) => { setUserInfo(res.data); });
  };

  if (openModal) {
    return (
      <RecipeModal
        recipe={recipe}
        setOpenModal={setOpenModal}
        handleAddToList={handleAddToList}
        handleFavorite={handleFavorite}
        isFavorite={isFavorite}
        setCurrentPage={setCurrentPage}
        userInfo={userInfo}
      />
    );
  }

  return (
    <div className="recipe-item" key={recipe.id}>
      <Name onClick={() => setOpenModal(true)} className="recipe-item-name">{recipe.name}</Name>
      <div className="recipe-item-ingredients">
        {recipe.ingredients.map((ingredient) => (
          !itemsArr.includes(ingredient.ingredientName)
            ? <div key={ingredient.id}>{ingredient.ingredientName}</div> : null
        ))}
      </div>
    </div>
  );
}
const Name = styled.h3`
  font-weight: bold;
  font-size: 25px;
  display:block;
  background: ${(props) => props.theme.maintilebg};
  margin: 0;
  margin-bottom: 2%;
  width: auto;
  overflow: auto;
  cursor: default;
  &:hover{
    opacity: 70%;
  }
`;
