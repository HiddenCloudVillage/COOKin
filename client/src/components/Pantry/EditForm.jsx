import React, { useState } from 'react';

const axios = require('axios');

function EditForm({
  ingredient,
  ingredientInfo,
  userInfo,
  setUserInfo,
  setUpdatePantry,
  setShow,
}) {
  const [name, setName] = useState(ingredient);
  const [amount, setAmount] = useState(ingredientInfo.q);
  const [category, setCategory] = useState(ingredientInfo.c);
  const [expiration, setExpiration] = useState(ingredientInfo.e);

  function handleEdit() {
    const newUserInfo = userInfo;
    newUserInfo.pantry[name] = {
      q: Number(amount),
      c: category,
      e: expiration,
    };
    axios({
      method: 'put',
      url: '/pantry',
      data: newUserInfo,
    })
      .then((res) => setUserInfo(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit();
        setShow(false);
      }}
    >
      <label>
        Name :
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Amount :
        <input
          type="number"
          name="amount"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Category :
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Expiration :
        <input
          type="text"
          name="expiration"
          value={expiration}
          required
          onChange={(e) => setExpiration(e.target.value)}
        />
      </label>
      <input type="submit" value="update" />
    </form>
  );
}

export default EditForm;
