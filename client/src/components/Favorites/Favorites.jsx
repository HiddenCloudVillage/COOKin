/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import star from './star.png';
import RecipeList from '../Suggestions/RecipeList';

export default function Favorites({
  userInfo, recipes, setUserInfo, setCurrentPage,
}) {
  const [fave, setFave] = useState([]);
  const [sort, setSort] = useState('alpha');
  const [page, setPage] = useState(0);
  const [openTile, setOpenTile] = useState(0);
  function sortAlpha(recipes, key) {
    // eslint-disable-next-line prefer-arrow-callback, func-names
    return recipes.sort(function (a, b) {
      // eslint-disable-next-line no-var
      var x = a[key]; var y = b[key];
      // eslint-disable-next-line no-nested-ternary
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  function sortPercent(recipes, key) {
    recipes.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      if (x > y) return -1;
      if (y < x) return 1;
      return 0;
    });
  }
  function findFaves(recipes) {
    const faveRecipes = [];
    const names = [];
    for (let i = 0; i < recipes.length; i += 1) {
      if (userInfo.favorites.includes(recipes[i].mealId)) {
        faveRecipes.push(recipes[i]);
        names.push(recipes[i].name);
      }
    }
    const pantryItems = userInfo?.pantry ? Object.keys(userInfo.pantry) : [];
    let ingredients = [];
    let count = 0;
    let percent = 0;
    for (let i = 0; i < faveRecipes.length; i += 1) {
      ingredients = faveRecipes[i].ingredients.map((recipe) => recipe.ingredientName)
        .filter((ingredient) => ingredient !== undefined);
      count = ingredients.reduce((acc, ingredient) => {
        if (pantryItems.includes(ingredient)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      percent = (count / ingredients.length) * 100;
      faveRecipes[i]['percent'] = percent;
    }
    if (sort === 'alpha') {
      sortAlpha(faveRecipes, 'name');
      setFave([...faveRecipes]);
    }
    if (sort === 'percent') {
      sortPercent(faveRecipes, 'percent');
      setFave([...faveRecipes]);
    }
  }
  function handleChange(e) {
    setSort(e.target.value);
  }
  useEffect(() => { findFaves(recipes); }, [sort]);
  return (
    <Page>
      <Sort>
        <h3>Sort By:</h3>
        <select onChange={(e) => handleChange(e)}>
          <option value="alpha">alphabetical</option>
          <option value="percent">percent ingredients</option>
        </select>
      </Sort>
      <RecipeList
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        recipes={fave}
        setCurrentPage={setCurrentPage}
        page={page}
        setPage={setPage}
        openTile={openTile}
        setOpenTile={setOpenTile}
      />
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Sort = styled.div`
  width: 70%;
`;

const Thumb = styled.img`
width: 10%;
margin-left: 10px;
`;

const Row = styled.div`
display: flex;
margin: 0 auto;
background-color: red;
width: 70%;
justify-content: space-between;
`;

const Desc = styled.div`
/* display: flex; */
font-size: 20px;
width: 80%;
background-color: yellow;
`;

const Star = styled.img`
width: 2%;
height: 2%
`;

const Name = styled.div`
font-size: 40px;
margin-right: 20px;
margin-left: 10px;
height: 50%;
`;

const Percent = styled.div`
font-size: 40px;
margin-right: 20px;
height: 10%;
`;

const Grid = styled.div`
margin: 0 auto;
width: 100%;
background-color: blue;
`;
