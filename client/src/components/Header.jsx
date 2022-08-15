import React from 'react';
import styled from 'styled-components';
import { auth } from '../lib/firebase';

const pageTitles = ['Suggested Recipes', 'Favorite Recipes', 'Grocery List', 'Pantry'];

function Header({ user, setCurrentPage, currentPage}) {
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
        <Title>
          COOKin.
        </Title>
      </HeaderLeft>
      {/* <PageTitlesContainer> */}
        {/* set style of currentPage to Special CSS... not code for anything just make it feel special */}
      <Nav>
        {pageTitles.map((title) => (
          <PageTitle
            key={title}
            id={title}
            name={title}
            onClick={(e) => handlePageChange(e)}
          >
            {title}
          </PageTitle>
        ))}
      </Nav>
      {/* </PageTitlesContainer> */}
      <HeaderRight>
        {user && <Img onClick={signOut} id="Header-icon" src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" />}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

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
  width: 30%;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: .5px solid;
  cursor: default;
`;

const HeaderLeft = styled.div`
  font-size: 35px;
  letter-spacing: -1.5px;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Nav = styled(HeaderLeft)`
  font-size: 25px;
  width: 60%;
`

const Title = styled.p`
  margin: 0;
  &: hover{
    opacity: 70%;
    cursor: pointer;
  }
  width: 100%;
`

const PageTitle = styled(Title)`
  margin-left: 5%;
  width: 100%;
`

// styling for the page titles in <HeaderContainer>
const PageTitlesContainer = styled.div`

`

const Button = styled.button`
  height: 50px;
  width: 100px;
  margin-top: 3%;
  text-align: center;
  font-size: 20px;
  &: hover{
    opacity: 70%;
    cursor: pointer;
  }
`;
