/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecipeTile from './RecipeTile';
import OpenTile from './OpenTile';

export default function RecipeList({
  recipes,
  userInfo,
  setUserInfo,
  setCurrentPage, page, setPage, openTile, setOpenTile,
}) {
  return (
    <RecListContainer>
      <RecList>
        {recipes.slice(page * 5, page * 5 + 5).map((recipe, i) => (
          (i === openTile)
            ? (
              <OpenTile
                key={recipe._id}
                recipe={recipe}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setCurrentPage={setCurrentPage}
              />
            )
            : <RecipeTile setOpen={setOpenTile} i={i} key={recipe._id} recipe={recipe} />
        ))}
      </RecList>
      <Buttons>
        <Button
          type="button"
          onClick={() => {
            setOpenTile(0);
            setPage((prev) => (prev > 0 ? prev - 1 : prev));
          }}
        >
          Previous

        </Button>
        page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {Math.ceil(recipes.length / 5)}
        <Button
          type="button"
          onClick={() => {
            setOpenTile(0);
            setPage((prev) => ((prev < Math.ceil(recipes.length / 5) - 1) ? prev + 1 : prev));
          }}
        >
          Next

        </Button>

      </Buttons>
    </RecListContainer>
  );
}

const RecListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items:center;
`;
const RecList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 304px;
`;

const Buttons = styled.div`
  margin-top: 3%;
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  height: auto;
  width: 15%;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.buttontext};
  background-color: ${(props) => props.theme.button2};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;
