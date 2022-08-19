// OpenTile React component
import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import RecipeModal from './RecipeModal';

export default function OpenTile({
  userInfo, recipe, setUserInfo, setCurrentPage,
}) {
  const [openModal, setOpenModal] = React.useState(false);
  const isFavorite = userInfo.favorites.includes(recipe.mealId);
  const handleAddToList = () => {
    const set = new Set(userInfo.groceryList);
    recipe.ingredients.forEach((ingredient) => {
      set.add(ingredient.ingredientName);
    });
    const newList = Array.from(set);
    const newUserInfo = { ...userInfo, grocery: newList };
    axios.put('/grocery', newUserInfo).then((res) => { setUserInfo(res.data); })
      .then(() => setCurrentPage('Grocery List'));
  };

  const handleFavorite = () => {
    const newFavorites = userInfo.favorites.includes(recipe.mealId)
      ? userInfo.favorites.filter((id) => id !== recipe.mealId)
      : [...userInfo.favorites, recipe.mealId];
    const newUserInfo = { ...userInfo, favorites: newFavorites };
    axios.put('/favorites', newUserInfo).then((res) => { setUserInfo(res.data); });
  };

  if (openModal) {
    return (
      <RecipeModal
        recipe={recipe}
        setOpenModal={setOpenModal}
        handleAddToList={handleAddToList}
        handleFavorite={handleFavorite}
        isFavorite={isFavorite}
        setCurrentPage={setCurrentPage}
        userInfo={userInfo}
      />
    );
  }

  return (
    <Tile>
      <Title>
        <NameDiv>
          {isFavorite ? (
            <StarIcon
              onClick={handleFavorite}
              sx={[{ fontSize: 32 },
                {
                  '&:hover': {
                    opacity: 0.7,
                    cursor: 'pointer',
                  },
                }]}
            />
          ) : (
            <StarBorderOutlinedIcon
              onClick={handleFavorite}
              sx={[{ fontSize: 32 },
                {
                  '&:hover': {
                    opacity: 0.7,
                    cursor: 'pointer',
                  },
                }]}
            />
          )}
          <Name onClick={() => setOpenModal(true)}>
            {recipe.name}
          </Name>
        </NameDiv>
        <NameDiv>

          <Name>
            {recipe.percent}
            %
          </Name>
        </NameDiv>
      </Title>
      <TileBot>
        <Thumbnail src={recipe.thumbnail} alt={recipe.name} />
        <BotRight>
          <Sp>
            This recipe matches
            {' '}
            {recipe.percent}
            % of the ingredients in your pantry including,
          </Sp>

          <Ingredients>
            <ul>
              {recipe.ingredients.slice(0, 4).map((ingredient) => (
                <li key={ingredient.ingredientName}>
                  {ingredient.ingredientName}
                </li>
              ))}
              <em>... and more</em>
            </ul>
          </Ingredients>
          <Buttons>
            <Button onClick={() => setOpenModal(true)}>
              Expand
            </Button>
            <Button
              onClick={handleAddToList}
              recipe={recipe}
            >
              Add to grocery list!
            </Button>
          </Buttons>
        </BotRight>
      </TileBot>
    </Tile>
  );
}
const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
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

const TileBot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 80%;
`;

const BotRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  min-height: 100%;
`;

const Sp = styled.span`
  margin-left: 3%;
  font-size: 15px;
  font-weight: normal;
`;

const Thumbnail = styled.img`
  max-width: 30%;
  max-height: 100%;
  resize: auto;
  margin-right: 3%;
`;
const Ingredients = styled.div`
  height: 70%;
  width: 40%;
  border-radius: 10px;
`;
const Buttons = styled(TileBot)`
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
  height: 15%;
`;
const Button = styled.button`
  height: auto;
  width: 30%;
  border-radius: 10px;
  border: 1px solid;
  padding: 10px;
  background: none;
  color: ${(props) => props.theme.buttontext};
  background-color: ${(props) => props.theme.button2};
  &:hover{
    cursor: pointer;
    opacity: 70%;
  }
`;

const Name = styled.h3`
  font-weight: bold;
  font-size: 25px;
  background: ${(props) => props.theme.maintilebg};
  margin: 0;
  width: auto;
  cursor: default;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: 0;
  padding: 0;
  margin-bottom: 2%;
  background: ${(props) => props.theme.maintilebg};
  border-bottom: .5px solid;
  `;

const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  justify-content: flex-start;
  margin-bottom: 1%;
`;
