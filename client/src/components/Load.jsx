import React from 'react';
import styled from 'styled-components';

function Load() {
  return (
    <LoadPage>
      <LoadContent>
        <p>LOADING</p>
        <Spinner id="spinner" src="icons/spinner.gif" />
      </LoadContent>
    </LoadPage>
  );
}

export default Load;

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