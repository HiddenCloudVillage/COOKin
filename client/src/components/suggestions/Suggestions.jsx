import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import RecipeList from './RecipeList';
import IncludeIngredient from './IncludeIngredient';
import ExcludeIngredient from './ExcludeIngredient';
import IncludeContext from '../IncludeContext';
import ExcludeContext from '../ExcludeContext';

export default function Suggestions({
  recipes,
  userInfo,
  setUserInfo,
  setCurrentPage,
}) {
  const [excludeIngredients, setExcludeIngredients] = useContext(ExcludeContext);
  const [includeIngredients, setIncludeIngredients] = useContext(IncludeContext);
  const [page, setPage] = useState(0);
  const [openTile, setOpenTile] = useState(0);
  // filter recipes by include ingredients and exclude ingredients
  const filterRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      let include = true;
      let exclude = false;
      recipe.ingredients.forEach((ingredient) => {
        const { ingredientName } = ingredient;
        const lowerIngredient = ingredientName
          && ingredientName.charAt(0).toLowerCase() + ingredientName.slice(1);

        const upperIngredient = ingredientName
          && ingredientName[0].toUpperCase() + ingredientName.slice(1);

        if (excludeIngredients.includes(lowerIngredient)
        || excludeIngredients.includes(upperIngredient)) {
          exclude = true;
        }
      });
      const recipeIngredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredientName,
      );
      includeIngredients.forEach((ingredient) => {
        const lowerIngredient = ingredient && ingredient[0].toLowerCase() + ingredient.slice(1);
        const upperIngredient = ingredient && ingredient[0].toUpperCase() + ingredient.slice(1);
        if (!recipeIngredients.includes(lowerIngredient)
        && !recipeIngredients.includes(upperIngredient)) {
          include = false;
        }
      });

      return include && !exclude;
    });

    const pantryIngredients = userInfo.pantry
      ? Object.keys(userInfo?.pantry)
      : [];
    const recipesWithPercent = filteredRecipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map(
          (ingredient) => ingredient.ingredientName,
        );
        const recipePercent = recipeIngredients.reduce((acc, ingredient) => {
          if (pantryIngredients.includes(ingredient)) {
            return acc + 1;
          }
          return acc;
        }, 0);
        const percent = Math.floor(
          (recipePercent / recipeIngredients.length) * 100,
        );
        return { ...recipe, percent };
      })
      .sort((a, b) => b.percent - a.percent);
    return recipesWithPercent;
  };
  return (
    <Page>
      <Left>
        <RecipeList
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          recipes={filterRecipes()}
          setCurrentPage={setCurrentPage}
          page={page}
          setPage={setPage}
          openTile={openTile}
          setOpenTile={setOpenTile}
        />
      </Left>
      <Right>
        <IncludeIngredient
          inclusion={includeIngredients}
          setInclusion={setIncludeIngredients}
          setPage={setPage}
          openTile={openTile}
          setOpenTile={setOpenTile}
        />
        <ExcludeIngredient
          exclusion={excludeIngredients}
          setExclusion={setExcludeIngredients}
          setPage={setPage}
          openTile={openTile}
          setOpenTile={setOpenTile}
        />
      </Right>
    </Page>
  );
}

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

const Left = styled.div`
  width: 60%;
`;

const Right = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
