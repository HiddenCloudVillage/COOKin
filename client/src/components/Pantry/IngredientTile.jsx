import React, { useContext } from 'react';
import styled from 'styled-components';
import EditIngredient from './EditIngredient';
import IncludeContext from '../IncludeContext';
import ExcludeContext from '../ExcludeContext';
import AddIngredient from './AddIngredient';
import UserIdContext from '../UserIdContext';

function IngredientTile({
  ingredient, ingredientInfo, setCurrentPage, isHeader,
}) {
  const [includeIngredients, setIncludeIngredients] = useContext(IncludeContext);
  const [excludeIngredients, setExcludeIngredients] = useContext(ExcludeContext);
  const [userInfo, setUserInfo] = useContext(UserIdContext);

  function handleItems() {
    setIncludeIngredients([ingredient]);
    setExcludeIngredients([]);
    setCurrentPage('Suggestions');
  }
  if (isHeader) {
    return (
      <Header>
        <Info>
          <Name>Ingredient</Name>
          <Attribute>Category</Attribute>
          <Attribute>Quantity</Attribute>
          <Attribute>Expiration</Attribute>
        </Info>
        <AddIngredient userInfo={userInfo} setUserInfo={setUserInfo} />
      </Header>
    );
  }
  const dating = ingredientInfo.e !== '' ? new Date(ingredientInfo.e) : '';
  const modifiedDate = dating !== '' ? dating.setDate(dating.getDate() + 1) : '';
  const ingredientExp = modifiedDate !== '' ? `${dating.toString().slice(4, 10)}, ${dating.toString().slice(13, 15)}` : '';
  const currentDate = new Date();
  const expiring = Date.parse(ingredientInfo.e) - Date.parse(currentDate) < 259200000;

  return (
    <Header>
      <Div>
        <Name onClick={handleItems}>{ingredient}</Name>
        <Attribute>{ingredientInfo.c}</Attribute>
        <Attribute>{ingredientInfo.q}</Attribute>
        {expiring ? <Attribute style={{ color: 'red' }}>{ingredientExp}</Attribute> : <Attribute>{ingredientExp}</Attribute>}
      </Div>
      <EditIngredient ingredient={ingredient} ingredientInfo={ingredientInfo} />
    </Header>
  );
}

export default IngredientTile;

const Header = styled.div`
  width: 100%;
  min-height: 5%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  background: ${(props) => props.theme.tilebg1};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
  cursor: default;
  transition: all 0.3s ease-in-out;
`;

const Info = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const Div = styled(Info)`
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    opacity: 0.7;
  }
  font-weight: bold;
`;

const Name = styled.div`
  background: ${(props) => props.theme.tilebg1};
  margin: 0;
  width: 25%;
`;

const Attribute = styled(Name)`
  width: 20%;
  text-align:center;
`;
