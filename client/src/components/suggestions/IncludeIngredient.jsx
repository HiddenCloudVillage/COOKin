/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ingredients from '../../lib/ingredients';

export default function IncludeIngredient() {
  const [inclusion, setInclusion] = useState([]);
  function handleClick(e, ing) {
    const newInclusion = inclusion.slice();
    const ind = newInclusion.indexOf(ing);
    newInclusion.splice(ind, 1);
    setInclusion(newInclusion);
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
        onChange={(e, newInputValue) => { newInputValue === null ? null : setInclusion((oldArray) => [...oldArray, newInputValue]); }}
      />
      <div>
        Include Ingredients:
        {[...new Set(inclusion)].map((ingredient) => (
          <div key={ingredient}>
            {ingredient}
            <button type="submit" onClick={(e) => handleClick(e, ingredient)}> X </button>
          </div>
        ))}
      </div>
    </div>
  );
}
