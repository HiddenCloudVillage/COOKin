/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../lib/firebase';

function Login() {
  const [rot, setRotation] = useState(0);
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  const handleClick = (e) => {
    console.log(rot);

    setRotation(rot + 90);
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <div>
          <Title id="logintitle" />
        </div>
        <small>what's cookin?</small>
        <Guy src="icons/COOkit3.svg" rot={rot} onClick={handleClick} />
        <Button onClick={signIn}>
          Sign in with Google.
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Guy = styled.img`
  height: 70px;
  resize: auto;
  animation: ${spin};
  animation-duration: 2s;
  transform: rotate(${(props => props.rot)}deg);
  transition: 0.7s;
`;

const Title = styled.img`
  height: 100px;
  resize: auto;
`;

const Button = styled.button`
    margin-top: 50px;
    padding: 5%;
    font-size: 16px;
    font-weight: 100;
    border-radius: 5px;
    background: ${(props) => props.theme.loginbutton};
    border: 1px solid transparent;
    width: 50%;
    color: ${(props) => props.theme.buttontext};
    &:hover{
    opacity: 70%;
    cursor: pointer;
  }
`;
const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
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
