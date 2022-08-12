/* eslint-disable import/extensions */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';
import key from './key';

const firebaseConfig = {
  apiKey: key,
  authDomain: 'blueocean-cloud.firebaseapp.com',
  projectId: 'blueocean-cloud',
  storageBucket: 'blueocean-cloud.appspot.com',
  messagingSenderId: '657670798970',
  appId: '1:657670798970:web:367bfb370b01be85d0c5c3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
