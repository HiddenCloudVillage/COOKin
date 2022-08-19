/* eslint-disable react/jsx-props-no-multi-spaces */
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material/';
import ingredients from '../../lib/ingredients';

export default function IncludeIngredient({ inclusion, setInclusion, setPage, setOpenTile }) {
  useEffect(() => {
    setPage(0);
    setOpenTile(0);
  }, [inclusion]);

  function handleClick(e, ing) {
    const newInclusion = inclusion.slice();
    const ind = newInclusion.indexOf(ing);
    newInclusion.splice(ind, 1);
    setInclusion(newInclusion);
  }
  return (
    <Container>
      <Title> Include </Title>
      <InnerContainer>
        <Autocomplete
          options={ingredients}
          size="small"
          sx={{ width: 170 }}
          includeInputInList
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
          // eslint-disable-next-line max-len, no-unused-expressions
          onChange={(e, newInputValue) => { newInputValue === null ? null : setInclusion((oldArray) => [...oldArray, newInputValue]); }}
        />
        <List>
          {[...new Set(inclusion)].map((ingredient) => (
            <Row key={ingredient}>
              <P>{ingredient}</P>
              <Button type="submit" onClick={(e) => handleClick(e, ingredient)}> X </Button>
            </Row>
          ))}
        </List>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  /* margin-top: 40px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 250px;
  height: auto;
  padding: 20px 0px 20px 0px;
  border-radius: 10px;
  background: ${(props) => props.theme.tilebg2};
  margin-bottom: 3%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
  height: auto;
  border-radius: 10px;
  margin: 2%;
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

const Button = styled.button`
  height: auto;
  width: auto;
  border-radius: 25%;
  border: 1px solid;
  padding: 3px 6px 3px 6px;
  background: none;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.button1};
  &:hover{
    cursor: pointer;
    opacity: 70%;
    letter-spacing: 1px;
    transition: 0.3s;
  }
`;