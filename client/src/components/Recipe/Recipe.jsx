import React from 'react';
import Video from './Video';
import Instructions from './Instructions';
import Ingredients from './Ingredients';

function Recipe() {
  return (
    <div>
      <div>Recipe</div>
      <Video />
      <Instructions />
      <Ingredients />
    </div>
  );
}

export default Recipe;
