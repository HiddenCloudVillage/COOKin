import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';



function Home({
  user, currentPage, userInfo, setUserInfo, recipes, setRecipes
}) {
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const checkInUser = (userObj) => {
    axios.post('/login', userObj)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => console.log('err', err));
  };
  const getRecipes = () => axios.get('/recipes')
    .then((response) => {
      setRecipes(response.data);
    })
    .catch((err) => console.log('err', err));

  useEffect(() => {
    checkInUser(user);
    getRecipes().then(() => setLoadingRecipes(false));
  }, []);

  return (
    <div>
      <h3>{`what's cookin, ${user.displayName}?`}</h3>
      {currentPage}
    </div>

  );
}

export default Home;
