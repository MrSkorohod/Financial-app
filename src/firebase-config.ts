// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBmLgKo_PfzPcHED7tiADE_jap0j4eXZsg',
  authDomain: 'financial-wallet-eca73.firebaseapp.com',
  projectId: 'financial-wallet-eca73',
  storageBucket: 'financial-wallet-eca73.appspot.com',
  messagingSenderId: '714822544579',
  appId: '1:714822544579:web:e8065762a9a74326400676',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
