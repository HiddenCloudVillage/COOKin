/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import star from './star.png';
import RecipeList from '../Suggestions/RecipeList';
import InstructionsButton from '../InstructionsButton';

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
      percent = Math.trunc((count / ingredients.length) * 100);
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
      <Top>
        <Title>Here are your favorite recipes.</Title>
        <InstructionsButton text="1. Your Favorites will be listed below.?
        2. To remove from your favorites list just click on the star next to the recipe name, or click the button in the expanded view.?
        3. You may add to your grocery list with the add to the grocery list button!?
        4. If you want to view the full recipe details, just click the expan button, or click on the recipe title"
        />
        <TopRight>
          <Sp>Sort By: </Sp>
          <Sort onChange={(e) => handleChange(e)}>
            <option value="alpha">alphabetical</option>
            <option value="percent">percent ingredients</option>
          </Sort>
        </TopRight>
      </Top>
      <Main>
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
      </Main>
    </Page>
  );
}

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;

const Top = styled.div`
  width: 72%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;
const Main = styled(Top)`
  width: 70%;
  margin-top: 1%;
  flex-direction: column;
  align-items: center;
`;

const Sort = styled.select`
  background: transparent;
  font-size: 20px;
  color: ${(props) => props.theme.text};
`;

const Title = styled.p`
  font-size: 20px;
  margin: 0;
`;

const TopRight = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Sp = styled.span`
  margin-right: 2%;
  width: 40%;
  font-size: 18px;
`