import React from 'react';
import styled from 'styled-components';
import { auth } from '../lib/firebase';

const pageTitles = ['Suggestions', 'Favorites', 'Grocery List', 'Pantry'];

function Header({ user, setCurrentPage, currentPage, themeToggler, theme, setDisplay }) {
  const signOut = () => {
    const result = confirm('signing out?');
    if (result) {
      auth.signOut()
        .then(() => {
          alert('goodbye');
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    }
  };
  const handlePageChange = (e) => {
    setCurrentPage(e.target.id);
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        {/* <Title>
          COOKin.
        </Title> */}
        <TitleLogo />
        <img src="./icons/COOkit3.svg" alt="global logo" width="40px" height="40px" style={{'padding': '5px 5px 5px 0'}} />
        <TitleImg id="headertitle" />
      </HeaderLeft>
      <Nav>
        {pageTitles.map((title) => (
          <PageDiv key={title} currentPage={currentPage} name={title}>
            <PageTitle
              key={title}
              id={title}
              name={title}
              onClick={(e) => handlePageChange(e)}
              currentPage={currentPage}
            >
              {title}
            </PageTitle>
          </PageDiv>
        ))}
      </Nav>
      <HeaderRight>
        <DarkMode onClick={themeToggler}>
          {theme}
        </DarkMode>
        <DarkMode onClick={() => setDisplay((prev) => !prev)}>
          Show Help
        </DarkMode>
        {user && <Img onClick={signOut} id="Header-icon" src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" />}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;
const TitleImg = styled.img`
  height: 40px;
  resize: auto;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 70%;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
  width: 25%;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.headerbg};
  cursor: default;
`;

const HeaderLeft = styled.div`
  font-size: 35px;
  letter-spacing: -1.5px;
  padding: 5px;
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Nav = styled(HeaderLeft)`
  font-size: 20px;
  letter-spacing: 0px;
  width: 50%;
  height: 100%;
`;

const Title = styled.p`
  margin: 0;
  color: ${(props) => props.theme.title};
  &: hover{bhn
    opacity: 70%;
    cursor: pointer;
  }
  width: 100%;
`;

const PageDiv = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 25%;
  height: 100%;
  background: ${(props) => (props.currentPage === props.name ? props.theme.background : props.theme.headerbg)}
`;

const PageTitle = styled(Title)`
  width: 100%;
`;
const DarkMode = styled(Title)`
  margin-right: 5%;
  font-size: 18px;
`;
