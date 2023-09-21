import  { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnFIplbaY2eei-QWZFApTVjM_McYPvlk4",
  authDomain: "hng-stage-three.firebaseapp.com",
  projectId: "hng-stage-three",
  storageBucket: "hng-stage-three.appspot.com",
  messagingSenderId: "777061190550",
  appId: "1:777061190550:web:05943b01ece66e12ababb7",
  measurementId: "G-Y0P3X9MPT3",
};

// firebase.initializeApp(firebaseConfig);

// export default firebase;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
