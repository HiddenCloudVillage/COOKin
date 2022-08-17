import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material/';
import ingredients from '../../lib/ingredients';

export default function ExcludeIngredient({ exclusion, setExclusion, setPage, setOpenTile }) {
  useEffect(() => {
    setPage(0);
    setOpenTile(0);
  }, [exclusion]);

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
          sx={{ width: 170 }}
          includeInputInList
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
          // eslint-disable-next-line max-len, no-unused-expressions
          onChange={(e, newInputValue) => { newInputValue === null ? null : setExclusion((oldArray) => [...oldArray, newInputValue]); }}
        />
        <List>
          {[...new Set(exclusion)].map((ingredient) => (
            <Row key={ingredient}>
              <P>{ingredient}</P>
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
  justify-content: space-evenly;
  width: 250px;
  height: 350px;
  background: ${(props) => props.theme.tilebg2};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.background};
  width: 90%;
  margin: 1%;
`;

const P = styled.p`
  margin: 0;
`;

const InnerContainer = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
  height: 70%;
`;

const List = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  width: 90%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
`;

const Title = styled.h1`
font-size: 20px;
  margin: 0px;
  color: ${(props) => props.theme.text2};
`;
