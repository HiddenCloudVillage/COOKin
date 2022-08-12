import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { auth } from '../lib/firebase';

function Home({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const checkInUser = (userObj) => {
    axios.post('/login', userObj)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => console.log('err', err));
  };

  // user.uid

  useEffect(() => {
    checkInUser(user);
  }, []);

  return (
    <div>
      <h3>{`what's cookin, ${user.displayName}?`}</h3>
    </div>

  );
}

export default Home;
