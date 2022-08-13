import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';

function Home({
  user, currentPage, userInfo, setUserInfo, recipes, setRecipes
}) {
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
      {currentPage}
    </div>

  );
}

export default Home;
