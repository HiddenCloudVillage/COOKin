import React, { useEffect, useState } from 'react';

export default function RecipeList({x, recipes, filterRecipes}) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(recipes.length / 5));

  console.log('loaded')

  return (
    <div>
      <h3>Recipes</h3>
      {recipes.slice(page * 5, page * 5 + 5).map((recipe) => (
        <div key={recipe.mealId}>
          <h4>{recipe.name}</h4>
          {/* <img src={recipe.thumbnail} alt={recipe.name} /> */}
          <p>
            {recipe.percent}
            %
          </p>
        </div>
      ))}
      <div>
        <button type="button" onClick={() => page > 0 && setPage(page - 1)}>Previous</button>
        <button type="button" onClick={() => page < pageCount && setPage(page + 1)}>Next</button>

      </div>
    </div>
  );
}
