
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.BD_PASWORD,
  authDomain: "crud-taller-d8f4b.firebaseapp.com",
  projectId: "crud-taller-d8f4b",
  storageBucket: "crud-taller-d8f4b.appspot.com",
  messagingSenderId: "1054027844361",
  appId: "1:1054027844361:web:feb29074e87d6b0bdce1d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export{db}
