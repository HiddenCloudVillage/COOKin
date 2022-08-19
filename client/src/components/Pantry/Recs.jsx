/* eslint-disable react/jsx-no-useless-fragment */
// import styled from 'styled-components';
import React from 'react';
import RecRecipeTile from './RecRecipeTile';

export default function Recs({
  recipes,
  userInfo,
  setCurrentPage,
  setUserInfo,
}) {
  const itemsInPantryAndGroceryList = new Set();
  const pantry = userInfo.pantry ? Object.keys(userInfo.pantry) : [];
  userInfo.groceryList.forEach((item) => {
    if (typeof item === 'string') {
      itemsInPantryAndGroceryList.add(item);
    } else {
      itemsInPantryAndGroceryList.add(item.name);
    }
  });
  pantry.forEach((item) => {
    itemsInPantryAndGroceryList.add(item);
  });

  const itemsArr = Array.from(itemsInPantryAndGroceryList);

  const recipesWithPercent = recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map(
        (ingredient) => ingredient.ingredientName,
      );
      const recipePercent = recipeIngredients.reduce((acc, ingredient) => {
        if (itemsArr.includes(ingredient)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      const percent = Math.floor(
        (recipePercent / recipeIngredients.length) * 100,
      );
      return { ...recipe, percent };
    })
    .sort((a, b) => b.percent - a.percent)
    .filter((recipe) => recipe.percent < 100)
    .slice(0, 2);
  const recipesWithFewestIngredientsMissing = recipesWithPercent.filter(
    (recipe) => {
      let missingIngredients = 0;
      recipe.ingredients.forEach((ingredient) => {
        if (!itemsArr.includes(ingredient.ingredientName)) {
          missingIngredients += 1;
        }
      });
      return missingIngredients < 6;
    },
  );

  return (
    <>
      {recipesWithFewestIngredientsMissing.length > 0 ? (
        <div className="recipe-list">
          {recipesWithFewestIngredientsMissing.map((recipe) => (
            <RecRecipeTile
              recipe={recipe}
              key={recipe.mealId}
              itemsArr={itemsArr}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setCurrentPage={setCurrentPage}
            />
          ))}
        </div>
      ) : (
        <div>
          <h1>No recipes with fewest ingredients missing</h1>
        </div>
      )}
    </>
  );
}
