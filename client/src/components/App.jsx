import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import GlobalStyle from './Theme/GlobalStyle';
import { lightTheme, darkTheme } from './Theme/Themes';
import Login from './Login';
import Home from './Home';
import Header from './Header';

// Import the two Recipe pages

function App() {
  const [user, loading] = useAuthState(auth);
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    console.log('should toggle theme');
  };
  const [currentPage, setCurrentPage] = useState('Suggested Recipes');

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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <MainDiv>
          {!user ? (
            <Login />
          )
            : (
              <HomeContainer>
                <Header currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
                <Home user={user} currentPage={currentPage} />
                <button onClick={themeToggler}>switch theme</button>
              </HomeContainer>
            )}
        </MainDiv>
      </>
    </ThemeProvider>

  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  /* background-color: #ffffff; */
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
  /* background: white; */
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
