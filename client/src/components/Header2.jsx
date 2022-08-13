import React from 'react';
import styled from 'styled-components';
import { auth } from '../lib/firebase';

const pageTitles = ['Suggested Recipes', 'Favorite Recipes', 'Grocery List', 'Pantry'];

function Header2({ user, setCurrentPage, currentPage}) {
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
    <Header2Container>
      <Title>COOKin.</Title>
      {/* <PageTitlesContainer> */}
        {/* set style of currentPage to Special CSS... not code for anything just make it feel special */}
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
      {/* </PageTitlesContainer> */}
      <Header2Right>
        {user && <Img onClick={signOut} id="Header-icon" src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" />}
      </Header2Right>
    </Header2Container>
  );
}

export default Header2;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 70%;
  }
`;

const Header2Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
  width: 30%;
`;
const Header2Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: .5px solid black;
  cursor: default;
`;

const Title = styled.div`
  font-size: 35px;
  letter-spacing: -1.5px;
  margin-left: 2%;
  margin-top:2%;
  display: flex;
  align-items: bottom;
  &: hover{
    opacity: 70%;
    cursor: pointer;
  }
`;

// styling for the page titles in <Header2Container>
const PageTitlesContainer = styled.div`

`

const PageTitle = styled.div`
font-size: 25px;
letter-spacing: -1.5px;
margin-left: 2%;
margin-top:2%;
display: flex;
align-items: bottom;
&: hover{
  opacity: 70%;
  cursor: pointer;
}
`;

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
