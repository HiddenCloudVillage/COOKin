import React from 'react';
import styled from 'styled-components';

export default function RecipeModal({ recipe, setOpenModal, handleAddToList }) {
  const exitModal = (e) => {
    if ((e.target.id === 'outside')) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };
  return (
    <Overlay id="outside" onClick={exitModal}>
      <button type="button" onClick={exitModal}>X</button>
      <Modal>
        <h2>{recipe.name}</h2>
        <h3>
          You have
          {' '}
          {recipe.percent}
          % of the needed ingredients.
        </h3>
        <Grid>
          <div>

            <Thumbnail src={recipe.thumbnail} alt={recipe.name} />
          </div>
          <VideoDiv>
            <VideoFrame
              src={`https://www.youtube.com/embed/${recipe.video.split('=')[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="video"
            />
          </VideoDiv>
          <Ingredients>
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.filter((obj) => obj.ingredientName).map((ingredient) => (
                <li key={ingredient.ingredientName}>
                  {ingredient.ingredientName}
                  {' '}
                  /
                  {' '}
                  {ingredient.ingredientQuantity}
                </li>
              ))}
            </ul>
          </Ingredients>
          <Instructions>
            <h4>Instructions</h4>
            <p>{recipe.instructions}</p>
          </Instructions>
        </Grid>
      </Modal>
    </Overlay>
  );
}
const Modal = styled.div`
  text-align: center;
  background-color: whitesmoke;
  border: 1px solid #979797;
  border-radius: 20px;
  position: fixed;
  z-index: 20;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const Grid = styled.div`

  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  `;
const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
 `;
const VideoDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  `;
const Instructions = styled.div`
text-align: justify;
  `;
const Thumbnail = styled.img`
  width: 20vh;
  float: left;
  top: -40%;
  left: 20%;
  position: relative;
  margin-right: 10px;
  border-radius: 10px;
  `;
const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  `;
