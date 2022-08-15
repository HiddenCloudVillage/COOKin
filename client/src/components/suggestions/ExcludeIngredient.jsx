/* eslint-disable react/jsx-props-no-multi-spaces */
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ingredients from '../../lib/ingredients';

export default function IncludeIngredient({ exclusion, setExclusion }) {
  function handleClick(e, ing) {
    const newExclusion = exclusion.slice();
    const ind = newExclusion.indexOf(ing);
    newExclusion.splice(ind, 1);
    setExclusion(newExclusion);
  }
  return (
    <div>
      <Autocomplete
        options={ingredients}
        sx={{ width: 300 }}
        includeInputInList
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Include" />}
        // eslint-disable-next-line max-len, no-unused-expressions
        onChange={(e, newInputValue) => { newInputValue === null ? null : setExclusion((oldArray) => [...oldArray, newInputValue]); }}
      />
      <div>
        Exclude Ingredients:
        {[...new Set(exclusion)].map((ingredient) => (
          <div key={ingredient}>
            {ingredient}
            <button type="submit" onClick={(e) => handleClick(e, ingredient)}> X </button>
          </div>
        ))}
      </div>
    </div>
  );
}
