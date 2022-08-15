import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import IncludeIngredient from './IncludeIngredient';
import ExcludeIngredient from './ExcludeIngredient';

<<<<<<< HEAD
export default function Suggestions({ recipes, userInfo, setUserInfo,
}) {
=======
export default function Suggestions({ recipes, userInfo, setUserInfo }) {
  console.log('USERINFO', userInfo);
>>>>>>> 13bf03c164c7d2a762c01ad1ea12e5b080d88e20
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);

  // filter recipes by include ingredients and exclude ingredients
  const filterRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      let include = true;
      let exclude = false;
      recipe.ingredients.forEach((ingredient) => {
        if (excludeIngredients.includes(ingredient.ingredientName)) {
          exclude = true;
        }
      });
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredientName);
      includeIngredients.forEach((ingredient) => {
        if (!recipeIngredients.includes(ingredient)) {
          include = false;
        }
      });

      return include && !exclude;
    });
    console.log(recipes);
    console.log('filteredRecipes', filteredRecipes);

    const pantryIngredients = userInfo.pantry ? Object.keys(userInfo?.pantry) : [];
    const recipesWithPercent = filteredRecipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredientName);
      const recipePercent = recipeIngredients.reduce((acc, ingredient) => {
        if (pantryIngredients.includes(ingredient)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      const percent = Math.floor((recipePercent / recipeIngredients.length) * 100);
      return { ...recipe, percent };
    }).sort((a, b) => b.percent - a.percent);
    return recipesWithPercent;
  };
  return (
    <div>
      <div>
        <RecipeList
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          recipes={filterRecipes()}
        />
      </div>
      <IncludeIngredient inclusion={includeIngredients} setInclusion={setIncludeIngredients} />
      <ExcludeIngredient exclusion={excludeIngredients} setExclusion={setExcludeIngredients} />
    </div>
  );
}
