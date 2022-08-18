import React from 'react';
import styled, { keyframes } from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

export default function SuggestedModal({
  handleFavorite, isFavorite, recipe, setOpenModal, handleAddToList, userInfo,
}) {
  const exitModal = (e) => {
    if ((e.target.id === 'recmodaloutside') && setOpenModal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };
  const pantry = userInfo?.pantry ? Object.keys(userInfo.pantry) : [];

  // console.log(recipe.instructions.split('. '));

  return (
    <Outer id="recmodaloutside" onClick={exitModal}>
      <Inner>
        <Top>
          <NameDiv>
            {isFavorite ? (
              <StarIcon onClick={handleFavorite} />

            ) : (
              <StarBorderOutlinedIcon onClick={handleFavorite} />

            )}
            <Title>{recipe.name}</Title>

          </NameDiv>
          <Title>
            {`${recipe.percent}%`}
          </Title>
        </Top>
        <Main>
          <MainLeft>
            <Thumbnail src={recipe.thumbnail} alt={recipe.name} />
            <VideoDiv>
              <VideoFrame
                src={`https://www.youtube.com/embed/${recipe.video.split('=')[1]}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="video"
              />
            </VideoDiv>
          </MainLeft>
          <MainRight>
            <Ingredients>
              <Subtitle>Ingredients</Subtitle>
              <ul>
                {recipe.ingredients.filter((obj) => obj.ingredientName).map((ingredient) => {
                  if (pantry.includes(ingredient.ingredientName)) {
                    return (
                      <li key={ingredient.ingredientName}>
                        <strong>
                          {ingredient.ingredientName}
                          {' '}
                          /
                          {' '}
                          {ingredient.ingredientQuantity}
                          ✓
                        </strong>
                      </li>
                    );
                  }
                  return (
                    <li key={ingredient.ingredientName}>
                      {ingredient.ingredientName}
                      {' '}
                      /
                      {' '}
                      {ingredient.ingredientQuantity}
                    </li>
                  );
                })}
              </ul>
            </Ingredients>
            <Instructions>
              <Subtitle>Instructions</Subtitle>
              <ul>{recipe.instructions.split('. ').map((step) => <li key={step}>{`${step}.`}</li>)}</ul>
            </Instructions>
          </MainRight>
        </Main>
        <Bottom>
          <Button type="button" onClick={handleAddToList}>
            Add to grocery list!
          </Button>
          <Button type="button" onClick={handleFavorite}>
            {isFavorite ? 'Remove From Favorites' : 'Add to Favorites'}
          </Button>
        </Bottom>

      </Inner>
    </Outer>
  );
}

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
`;

const Subtitle = styled(Title)`
  font-size: 20px;
`;

const Top = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Main = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`;
const MainLeft = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
const MainRight = styled.div`
  margin-left: 5%;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
`;

const Bottom = styled(Main)`
  height: 10%;
`;
const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const VideoDiv = styled.div`
  width: 100%;
  height:47%;
`;
const Instructions = styled(Ingredients)`
  /* overflow-y: auto; */
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 47%;
  object-fit: cover;
  /* resize: auto; */
`;
const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  overflow: auto;
  background-color: ${(props) => props.theme.bgmodal1};
  background-color: ${(props) => props.theme.bgmodal2};
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
`;

const Inner = styled.div`
  display: flex;
  z-index: 201;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  opacity: 1;
  width: 80vw;
  height: 70vh;
  padding: 3%;
  padding-bottom: 1%;
  padding-top: 1%;
  /* max-width: 400px;
  max-height: 400px; */
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props) => props.theme.tilebg1};
  border: .5px solid;
  border-radius: 10px;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
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
const NameDiv = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  //width: 100%;
  //height: 10%;
  //margin-bottom: 10px;
`;
