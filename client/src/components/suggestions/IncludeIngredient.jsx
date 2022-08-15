import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ingredients from '../../lib/ingredients';

export default function IncludeIngredient() {
  const [inclusion, setInclusion] = useState([]);
  return (
    <div>
      <Autocomplete
        options={ingredients}
        sx={{ width: 300 }}
        includeInputInList
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Include" />}
        // eslint-disable-next-line max-len
        onInputChange={(e, newInputValue) => setInclusion((oldArray) => [...oldArray, newInputValue])}
      />
      <div>
        Include Ingredients:
        {[...new Set(inclusion)].map((ingredient) => <div>{ingredient}</div>)}
      </div>
    </div>
  );
}
