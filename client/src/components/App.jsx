import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Header2 from './Header2';

function App() {
  const [user, loading] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(['suggested']);

  // const pages = {
  //   'Suggested Recipes': <Suggested />,
  //   'Favorite Recipes': <Favorites />,
  //   'Grocery List': <GroceryList />,
  //   Recipe: <Recipe recipeName={'tacos'} />,
  //   Pantry: <Pantry />,
  // };
  const pages = {
    'Suggested Recipes': 'suggested recipe page',
    'Favorite Recipes': 'Favorites page',
    'Grocery List': 'grocery list page',
    Recipe: 'Recipe page',
    Pantry: 'pantry page',
  };

  const displayPage = (pageName) => pages[pageName];

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
            {/* <Header user={user} /> */}
            <Header2 currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
            <Home user={user}>{displayPage(currentPage)}</Home>
          </HomeContainer>
        )}
    </MainDiv>
  );
}

const HomeContainer = styled.div`
  display: grid;
  place-items: center;
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
