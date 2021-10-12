import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyddp2vs8JJfytLxDy5t3tQswv1TT1WwE",
  authDomain: "invi-chat.firebaseapp.com",
  projectId: "invi-chat",
  storageBucket: "invi-chat.appspot.com",
  messagingSenderId: "758776663456",
  appId: "1:758776663456:web:1a438e2a7cc61eae1728c5",
  measurementId: "G-55NNVS23TK",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
