import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import RecipeModal from '../Suggestions/RecipeModal';

export default function RecRecipeTile({
  recipe, itemsArr, userInfo, setUserInfo, setCurrentPage,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const handleClick = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  }

  const handleButton = () => {
    setOpenModal(true);
  }


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
    <Tile className="recipe-item" key={recipe.id}>
      <Top onClick={handleClick}>
        <Name className="recipe-item-name">{recipe.name}</Name>
        {expanded && <Button expanded={expanded} onClick={handleButton}>view</Button>}
      </Top>
      <IngList className="recipe-item-ingredients" expanded={expanded}>
        {recipe.ingredients.map((ingredient) => (
          !itemsArr.includes(ingredient.ingredientName)
            ? <Ing expanded={expanded} key={ingredient.id}>{ingredient.ingredientName}</Ing> : null
        ))}
      </IngList>
    </Tile>
  );
}

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Tile = styled.div`
  width: 70%;
  min-height: 5%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2%;
  background: ${(props) => props.theme.tilebg1};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

`;

const IngList = styled.div`
  width: 100%;
  height: ${(props) => !props.expanded ? '0px' : 'auto'};
  /* height: 100px; */
  opacity: ${(props) => !props.expanded ? 0 : 100};
  transition: 0.4s;
  margin: ${(props) => !props.expanded ? 0 : 10}px;

`;
const Ing = styled(IngList)`
  height: ${(props) => props.expanded ? 18 : 0}px;
  transition: 0.4s;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  background: ${(props) => props.theme.tilebg1};
  margin: 0;
  &:hover {
    transform: scale(1.01);
    opacity: 0.7;
  }
`;

const Perc = styled(Name)`

`;


const Button = styled.button`
  height: auto;
  width: 20%;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.button1};
  animation: ${fadeIn};
  animation-duration: 0.5s;
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;