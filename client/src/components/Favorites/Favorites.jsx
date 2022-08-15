import React, { useState, useEffect } from 'react';

export default function Favorites({ userInfo, recipes }) {
  const [fave, setFave] = useState([]);
  function findFaves(allRecipes) {
    const faveRecipes = [];
    for (let i = 0; i < allRecipes.length; i += 1) {
      if (userInfo.favorites.includes(allRecipes[i].mealId)) {
        faveRecipes.push(allRecipes[i]);
      }
    }
    setFave(faveRecipes);
  }
  useEffect(() => { findFaves(recipes); }, []);
  return (
    <div>
      <h1>Favorites</h1>
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
