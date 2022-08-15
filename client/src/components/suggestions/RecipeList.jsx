import React from 'react';

export default function RecipeList() {
  const fakeData = [{ name: 'lasagna', percent: 95 }, { name: 'lasagnas', percent: 5 }];
  return (
    <div>
      {fakeData.map((recipe) => (
        <div key={recipe.name}>
          {recipe.name}
          {recipe.percent}
          <button type="button">!!</button>
        </div>
      ))}
    </div>
  );
}
