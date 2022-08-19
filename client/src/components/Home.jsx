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
    <UserIdContext.Provider value={[userInfo, setUserInfo]}>
      <IncludeContext.Provider
        value={[includeIngredients, setIncludeIngredients]}
      >
        <ExcludeContext.Provider
          value={[excludeIngredients, setExcludeIngredients]}
        >
          <Container>
            {/* <h3>{`what's cookin, ${user.displayName}?`}</h3> */}
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
                recipes={recipes}
              />
            )}
            {/* <Guy id="ayo" src="icons/COOkit3.svg" /> */}
          </Container>
        </ExcludeContext.Provider>
      </IncludeContext.Provider>
    </UserIdContext.Provider>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const Guy = styled.img`
  position: fixed;
  height: 20%;
  width: 20%;
  opacity: 40%;
  z-index:-1;
  transform: rotate(-10);
`;
