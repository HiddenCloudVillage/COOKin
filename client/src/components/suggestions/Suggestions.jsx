import React, { useEffect, useState } from 'react';
import RecipeList from './RecipeList';
import IncludeIngredient from './IncludeIngredient';
import ExcludeIngredient from './ExcludeIngredient';

export default function Suggestions({ userInfo, setUserInfo, recipes }) {
  const [includedIngredients, setIncludedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);

  const filterAndSortRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) => {
      let include = true;
      let exclude = false;
      recipe.ingredients.forEach((ingredient) => {
        if (excludedIngredients.includes(ingredient.ingredientName)) {
          exclude = true;
        }
      });
      const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredientName);
      includedIngredients.forEach((inc) => {
        if (!recipeIngredients.includes(inc)) {
          include = false;
        }
      });
      return include && !exclude;
    });

    filteredRecipes.forEach((recipe) => {
      let count = 0;
      const ingredientCount = recipe.ingredients.length;
      recipe.ingredients.forEach((ingredient) => {
        if (userInfo.pantry[(ingredient.ingredientName)]) {
          count += 1;
        }
      });
      recipe.percent = Math.floor((count / ingredientCount) * 100);
    });
    return filteredRecipes.sort((a, b) => b.percent - a.percent);
  };
  return (
    <div>
      <div>
        <RecipeList filteredAndSortedRecipes={filterAndSortRecipes()} />
      </div>
      <IncludeIngredient
        includedIngredients={includedIngredients}
        setIncludedIngredients={setIncludedIngredients}
      />
      <ExcludeIngredient
        excludedIngredients={excludedIngredients}
        setExcludedIngredients={setExcludedIngredients}
      />
    </div>
  );
}
