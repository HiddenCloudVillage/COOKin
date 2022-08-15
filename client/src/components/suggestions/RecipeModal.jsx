import React from 'react';
import styled from 'styled-components';

export default function RecipeModal({ recipe, setOpenModal, handleAddToList }) {
  return (
    <Overlay>
      <button type="button" onClick={() => setOpenModal(false)}>X</button>
      <Modal>
        <h1>{recipe.name}</h1>
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
  height: 90%;
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
