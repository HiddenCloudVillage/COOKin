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
              </Name>
            </Row>
            <TileBot>
              <Thumb src={recipe.thumbnail} alt="instructions" />
              <BotRight>
                <Percent>
                  {recipe.percent}
                  %
                </Percent>
                <Desc>
                  You have&nbsp;
                  {recipe.percent}
                  % of the necessary ingredients to make this recipe!
                </Desc>
              </BotRight>
            </TileBot>
          </Grid>
        ))}
      </div>
    </div>
  );
}

const Thumb = styled.img`
  width: 25%;
  resize: auto;
  margin-right: 3%;
`;

const Row = styled.div`
display: flex;
/* margin: 0 auto; */
width: 100%;
margin-right: 100px;
/* justify-content: space-between; */
`;

const TileBot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Desc = styled.div`
/* display: flex; */
font-size: 20px;
width: 80%;
`;

const Star = styled.img`
width: 2%;
height: 2%
`;

const Name = styled.div`
font-weight: bold;
  font-size: 25px;
  display:block;
  background: ${(props) => props.theme.maintilebg};
  margin: 0;
  margin-bottom: 2%;
  width: auto;
  overflow: auto;
  border-bottom: 1px solid;
  cursor: default;
  &:hover{
    opacity: 70%;
  }
`;

const BotRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: 100%;
`;

const Percent = styled.div`
margin: 0;
font-size: 30px;
font-weight: bold;
`;

const Grid = styled.div`
margin: 0 auto;
width: 100%;
background-color: blue;
display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 85%;
  min-height: 250px;
  padding: 2%;
  background: ${(props) => props.theme.tilebg1};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
`;
