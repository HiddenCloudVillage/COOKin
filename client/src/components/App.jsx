import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import GlobalStyle from './Theme/GlobalStyle';
import { lightTheme, darkTheme } from './Theme/Themes';
import useDarkMode from './Theme/useDarkMode';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Load from './Load';

function App() {
  const [user, loading] = useAuthState(auth);
  // const [theme, setTheme] = useState('light');
  const [theme, setTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const [currentPage, setCurrentPage] = useState('Suggested Recipes');

  if (loading) {
    return (
      <Load />
    );
  }

  return (
    <ThemeProvider theme={themeMode}>
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
