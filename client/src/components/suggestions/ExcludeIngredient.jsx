/* eslint-disable react/jsx-props-no-multi-spaces */
import styled from 'styled-components';
import React from 'react';
import { Autocomplete, TextField } from '@mui/material/';
import ingredients from '../../lib/ingredients';

export default function ExcludeIngredient({ exclusion, setExclusion }) {
  function handleClick(e, ing) {
    const newExclusion = exclusion.slice();
    const ind = newExclusion.indexOf(ing);
    newExclusion.splice(ind, 1);
    setExclusion(newExclusion);
  }
  return (
    <Container>
      <Title> Exclude </Title>
      <InnerContainer>
        <Autocomplete
          options={ingredients}
          sx={{ width: 300 }}
          includeInputInList
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
          // eslint-disable-next-line max-len, no-unused-expressions
          onChange={(e, newInputValue) => { newInputValue === null ? null : setExclusion((oldArray) => [...oldArray, newInputValue]); }}
        />
        <List>
          {[...new Set(exclusion)].map((ingredient) => (
            <Row key={ingredient}>
              {ingredient}
              <button type="submit" onClick={(e) => handleClick(e, ingredient)}> X </button>
            </Row>
          ))}
        </List>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: 500px;
  background-color: #D4A373;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #FAEDCD;
  width: 290px;
`;

const InnerContainer = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAEDCD;
  height: 390px;
`;

const List = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAEDCD;
`;

const Title = styled.h1`
color: #FAEDCD;
`;
