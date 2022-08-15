/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';

export default function Favorites({ userInfo, recipes }) {
  const [fave, setFave] = useState([]);
  const [sort, setSort] = useState('alpha');
  function handleChange(e) {
    setSort(e.target.value);
  }
  function sortAlpha(recipes, key) {
    // eslint-disable-next-line prefer-arrow-callback, func-names
    return recipes.sort(function (a, b) {
      // eslint-disable-next-line no-var
      var x = a[key]; var y = b[key];
      // eslint-disable-next-line no-nested-ternary
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  function findFaves(recipes) {
    const faveRecipes = [];
    const names = [];
    for (let i = 0; i < recipes.length; i += 1) {
      if (userInfo.favorites.includes(recipes[i].mealId)) {
        faveRecipes.push(recipes[i]);
        names.push(recipes[i].name);
      }
    }
    const pantryItems = Object.keys(userInfo.pantry);
    let ingredients = [];
    let percent = 0;
    for (let i = 0; i < faveRecipes.length; i += 1) {
      ingredients = faveRecipes[i].ingredients.map((recipe) => recipe.ingredientName)
        .filter((ingredient) => ingredient !== undefined);
      percent = ingredients.reduce((acc, ingredient) => {
        if (pantryItems.includes(ingredient)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      faveRecipes[i]['percent'] = percent;
    }
    if (sort === 'alpha') {
      sortAlpha(faveRecipes, 'name');
      setFave(faveRecipes);
    }
    if (sort === 'percent') {
      sortAlpha(faveRecipes, 'percent');
      setFave(faveRecipes);
    }
  }
  useEffect(() => { findFaves(recipes); }, []);
  return (
    <div>
      <h1>Favorites</h1>
      <h3>Sort By:</h3>
      <select onChange={(e) => handleChange(e)}>
        <option value="alpha">alphabetical</option>
        <option value="percent">percent ingredients</option>
      </select>
      {fave.map((recipe) => (
        <div key={recipe.name}>
          <div>
            {recipe.name}
          </div>
          <div>
            {recipe.instructions}
          </div>
          <img src={recipe.thumbnail} alt="instructions" />
        </div>
      ))}
    </div>
  );
}
