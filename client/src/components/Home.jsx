import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';
import Pantry from './Pantry/Pantry';
import Recipe from './Recipe/Recipe';
import Suggestions from './Suggestions/Suggestions';
import GroceryList from './GroceryList/GroceryList';

function Home({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const [recipes, setRecipes] = useState([]);
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
      <Pantry userInfo={userInfo} setUserInfo={setUserInfo} />
      <GroceryList userInfo={userInfo} setUserInfo={setUserInfo} />
      <Recipe userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} />
      {
      !loadingRecipes
      && <Suggestions userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} />
      }
    </div>

  );
}

export default Home;
