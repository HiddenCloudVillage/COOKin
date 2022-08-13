import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Suggestions from './suggestions/Suggestions';
import GroceryList from './GroceryList/GroceryList';
import Pantry from './Pantry/Pantry';
import Recipe from './Recipe/Recipe';
// Import the two Recipe pages

function App() {
  const [user, loading] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState('Suggested Recipes');
  const [userInfo, setUserInfo] = useState({});
  const [recipes, setRecipes] = useState([]);

  const pages = {
    'Suggested Recipes': <Suggestions userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} />,
    'Favorite Recipes': 'Favorites Component Placeholder',
    'Grocery List': <GroceryList userInfo={userInfo} setUserInfo={setUserInfo} />,
    // Modal for Recipe Component?
    Recipe: <Recipe userInfo={userInfo} setUserInfo={setUserInfo} recipes={recipes} />,
    Pantry: <Pantry userInfo={userInfo} setUserInfo={setUserInfo} />,
  };

  const displayPage = (pageName) => pages[pageName];

  useEffect(() => {
    displayPage(currentPage);
  });

  if (loading) {
    return (
      <LoadPage>
        <LoadContent>
          <p>LOADING</p>
          <Spinner id="spinner" src="icons/spinner.gif" />
        </LoadContent>
      </LoadPage>
    );
  }

  return (
    <MainDiv>
      {!user ? (
        <Login />
      )
        : (
          <HomeContainer>
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
            <p>{displayPage(currentPage)}</p>
            <Home user={user} currentPage={pages.currentPage} />
          </HomeContainer>
        )}
    </MainDiv>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
`;

const Spinner = styled.img`
  size: auto;
  max-height: 100px;
  background-color: transparent;
`;

const LoadPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background: white;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const LoadContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default App;
