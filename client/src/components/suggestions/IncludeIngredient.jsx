import React, { useState } from 'react';

export default function IncludeIngredient({ includedIngredients, setIncludedIngredients }) {
  const [form, setForm] = useState('');

  return (
    <div>
      <form>
        <input type="text" value={form} onChange={(e) => setForm(e.target.value)} />
        <input type="submit" />
      </form>
      <div>
        {includedIngredients}
      </div>
    </div>
  );
}
