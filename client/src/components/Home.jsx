import React from 'react';
import styled from 'styled-components';
import { auth } from '../lib/firebase';

function Home({ user }) {
  return (
    <div>
      <h3>{`what's cookin, ${user.displayName}?`}</h3>
    </div>

  );
}

export default Home;
