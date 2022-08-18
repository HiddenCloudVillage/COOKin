import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';
import Suggestions from './Suggestions/Suggestions';
import Favorites from './Favorites/Favorites';
import GroceryList from './GroceryList/GroceryList';
import Pantry from './Pantry/Pantry';
import Load from './Load';
import UserIdContext from './UserIdContext';
import IncludeContext from './IncludeContext';
import ExcludeContext from './ExcludeContext';

function Home({ user, currentPage, setCurrentPage }) {
  const [userInfo, setUserInfo] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [openTile, setOpenTile] = useState(0);
  const [page, setPage] = useState(0);
  const [includeIngredients, setIncludeIngredients] = useState([]);
  const [excludeIngredients, setExcludeIngredients] = useState([]);
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
    axios
      .get('/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    checkInUser(user);
    getRecipes();
  }, []);

  if (!userInfo.userId || !recipes.length) {
    // PAGE SHOULD NOT LOAD UNTIL USERINFO RETURNED FROM DB
    return <Load />;
  }

  return (
    <UserIdContext.Provider value={[userInfo, setUserInfo]}>
      <IncludeContext.Provider
        value={[includeIngredients, setIncludeIngredients]}
      >
        <ExcludeContext.Provider
          value={[excludeIngredients, setExcludeIngredients]}
        >
          <div>
            <h3>{`what's cookin, ${user.displayName}?`}</h3>
            {currentPage === 'Suggestions' && (
              <Suggestions
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                recipes={recipes}
                setCurrentPage={setCurrentPage}
                page={page}
                setPage={setPage}
                setOpenTile={setOpenTile}
                openTile={openTile}
              />
            )}
            {currentPage === 'Favorites' && (
              <Favorites
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                recipes={recipes}
                setCurrentPage={setCurrentPage}
                setPage={setPage}
              />
            )}
            {currentPage === 'Grocery List' && (
              <GroceryList userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
            {currentPage === 'Pantry' && (
              <Pantry
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </ExcludeContext.Provider>
      </IncludeContext.Provider>
    </UserIdContext.Provider>
  );
}

export default Home;
