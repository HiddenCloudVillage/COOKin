/* eslint-disable dot-notation */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import star from './star.png';

export default function Favorites({ userInfo, recipes }) {
  const [fave, setFave] = useState([]);
  const [sort, setSort] = useState('alpha');
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
    <div>
      <h1>Favorites</h1>
      <h3>Sort By:</h3>
      <select onChange={(e) => handleChange(e)}>
        <option value="alpha">alphabetical</option>
        <option value="percent">percent ingredients</option>
      </select>
      <div>
        {fave.map((recipe) => (
          <Grid key={recipe.name}>
            <Row>
              <Star src={star} alt="star" />
              <Name>
                {recipe.name}
                <Desc>
                  You have&nbsp;
                  {recipe.percent}
                  % of the necessary ingredients to make this recipe!
                </Desc>
              </Name>
              <Percent>
                {recipe.percent}
                %
              </Percent>
              <Thumb src={recipe.thumbnail} alt="instructions" />
            </Row>
          </Grid>
        ))}
      </div>
    </div>
  );
}

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
