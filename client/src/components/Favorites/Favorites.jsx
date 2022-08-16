/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';

export default function Favorites({ userInfo, recipes }) {
  const [fave, setFave] = useState([]);
  const [sort, setSort] = useState('alpha');
  function sortAlpha(recipes, key) {
    // eslint-disable-next-line prefer-arrow-callback, func-names
    return recipes.sort(function (a, b) {
      // eslint-disable-next-line no-var
      var x = a[key]; var y = b[key];
      // eslint-disable-next-line no-nested-ternary
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  function sortPercent(recipes, key) {
    recipes.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      if (x > y) return -1;
      if (y < x) return 1;
      return 0;
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
    const pantryItems = userInfo?.pantry ? Object.keys(userInfo.pantry) : [];
    let ingredients = [];
    let count = 0;
    let percent = 0;
    for (let i = 0; i < faveRecipes.length; i += 1) {
      ingredients = faveRecipes[i].ingredients.map((recipe) => recipe.ingredientName)
        .filter((ingredient) => ingredient !== undefined);
      // console.log('ing', ingredients);
      // console.log('panties', pantryItems);
      count = ingredients.reduce((acc, ingredient) => {
        if (pantryItems.includes(ingredient)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      // console.log('count', count);
      percent = (count / ingredients.length) * 100;
      console.log('percent', percent);
      faveRecipes[i]['percent'] = percent;
    }
    console.log('preSort', faveRecipes);
    if (sort === 'alpha') {
      sortAlpha(faveRecipes, 'name');
      setFave([...faveRecipes]);
    }
    if (sort === 'percent') {
      sortPercent(faveRecipes, 'percent');
      console.log('postSort', faveRecipes);
      setFave([...faveRecipes]);
    }
  }
  function handleChange(e) {
    setSort(e.target.value);
  }
  useEffect(() => { findFaves(recipes); }, [sort]);
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
