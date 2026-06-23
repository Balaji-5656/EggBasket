import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZGLuV5XQ295cPHSFqZ5j_TKPntfpqDlk",
  authDomain: "eggbasket-1234.firebaseapp.com",
  projectId: "eggbasket-1234",
  storageBucket: "eggbasket-1234.firebasestorage.app",
  messagingSenderId: "173258602130",
  appId: "1:173258602130:web:c01feaebbd883fc7ed184b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);