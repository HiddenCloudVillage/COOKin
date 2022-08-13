import React from 'react';

export default function RecipeList() {
  const fakeData = [{ name: 'lasagna', percent: 95 }, { name: 'lasagna', percent: 5 }];
  return (
    <div>
      {fakeData.map((recipe) => (
        <div>
          {recipe.name}
          {recipe.percent}
          <button type="button">!!</button>
        </div>
      ))}
    </div>
  );
}
