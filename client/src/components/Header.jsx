import React from 'react';
import styled from 'styled-components';
import { auth } from '../lib/firebase';

function Header({ user }) {
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
  return (
    <HeaderContainer>
      <Title>COOKin.</Title>
      <HeaderRight>
        {user
        && <Img onClick={signOut} id="header-icon" src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" />}
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
