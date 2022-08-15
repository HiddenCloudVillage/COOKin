/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <div>
          <h1>COOKin</h1>
        </div>
        <small>what's cookin?</small>
        <Button onClick={signIn}>
          Sign in with Google.
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const Button = styled.button`
    margin-top: 50px;
    padding: 5%;
    font-size: 16px;
    font-weight: 100;
    border-radius: 5px;
    background: #00a941;
    border: 1px solid transparent;
    width: 50%;
    color: #ffffff;
    &:hover{
    opacity: 70%;
    cursor: pointer;
  }
`;
const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoginInnerContainer = styled.div`
  padding: 50px;
  height: 70vh;
  width: 70vw;
  max-width: 500px;
  max-height: 500px;
  text-align: center;
  border-radius: 10px;
  border: .5px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

`;
