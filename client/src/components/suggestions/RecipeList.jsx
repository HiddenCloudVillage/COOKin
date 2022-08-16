/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecipeTile from './RecipeTile';
import OpenTile from './OpenTile';

export default function RecipeList({recipes, userInfo, setUserInfo }) {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(Math.ceil(recipes.length / 5));
  const [openTile, setOpenTile] = useState(0);

  useEffect(() => {
    setPage(0);
    setOpenTile(0);
    setPageCount(Math.ceil(recipes.length / 5));
  }, [recipes]);
  return (
    <div>
      <h3>Recipes</h3>
      <RecList>

        {recipes.slice(page * 5, page * 5 + 5).map((recipe, i) => (
          (i === openTile)
            ? (
              <OpenTile
                key={recipe._id}
                recipe={recipe}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            )
            : <RecipeTile setOpen={setOpenTile} i={i} key={recipe._id} recipe={recipe} />
        ))}
      </RecList>
      <div>
        <button
          type="button"
          onClick={() => {
            setOpenTile(0);
            setPage(page > 0 ? page - 1 : page);
          }}
        >
          Previous

        </button>
        page
        {' '}
        {page + 1}
        {' '}
        of
        {' '}
        {pageCount}
        <button
          type="button"
          onClick={() => {
            setOpenTile(0);
            setPage(page < pageCount ? page + 1 : page);
          }}
        >
          Next

        </button>

      </div>
    </div>
  );
}
const RecList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 304px;
  `;
