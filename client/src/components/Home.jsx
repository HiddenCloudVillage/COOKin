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
  const checkInUser = (userObj) => {
    axios.post('/login', userObj)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => console.log('err', err));
  };
  const getRecipes = () => {
    // some sort of request
    // only happens once
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

  return (
    <div>
      <h3>{`what's cookin, ${user.displayName}?`}</h3>
      <Pantry userInfo={userInfo} setUserInfo={setUserInfo} />
      {/* <GroceryList userInfo={userInfo} setUserInfo={setUserInfo} />
      <Suggestions userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} />
      <Recipe userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} /> */}
    </div>

  );
}

export default Home;
