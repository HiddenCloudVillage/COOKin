import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';
import Suggestions from './Suggestions/Suggestions';
import Favorites from './Favorites/Favorites';
import GroceryList from './GroceryList/GroceryList';
import Pantry from './Pantry/Pantry';
import Recipe from './Recipe/Recipe';
import Load from './Load';

function Home({ user, currentPage }) {
  const [userInfo, setUserInfo] = useState({});
  const [recipes, setRecipes] = useState([]);
  const checkInUser = (userObj) => {
    axios
      .post('/login', userObj)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => console.log('err', err));
  };
  const getRecipes = () => {
    // some sort of request
    // only happens once
    axios
      .get('/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => console.log('err', err));
  };

  const filterRecipes = () => {
    // happens on ingredients/userinfo
  };
  useEffect(() => {
    checkInUser(user);
    getRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [userInfo]);

  if (!userInfo.userId || !recipes.length) {
    // PAGE SHOULD NOT LOAD UNTIL USERINFO RETURNED FROM DB
    return <Load />;
  }

  return (
    <div>
      <h3>{`what's cookin, ${user.displayName}?`}</h3>

      {currentPage === 'Suggested Recipes' && (
        <Suggestions
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          recipes={recipes}
        />
      )}
      {currentPage === 'Favorite Recipes' && (
        <Favorites
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          recipes={recipes}
        />
      )}
      {currentPage === 'Grocery List' && (
        <GroceryList userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
      {currentPage === 'Pantry' && (
        <Pantry userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
    </div>
  );
}

export default Home;