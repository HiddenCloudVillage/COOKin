import React from 'react';
import RecipeList from './RecipeList';
import IncludeIngredient from './IncludeIngredient';
import ExcludeIngredient from './ExcludeIngredient';

export default function Suggestions() {
  return (
    <div>
      <div>
        <RecipeList />
      </div>
      <IncludeIngredient />
      <ExcludeIngredient />
    </div>
  );
}
