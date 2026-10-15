import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK4Ynvl8Wr8GAeFKkiBwFNZAld4qI4AwI",
  authDomain: "pinterest-clone-81e93.firebaseapp.com",
  projectId: "pinterest-clone-81e93",
  storageBucket: "pinterest-clone-81e93.firebasestorage.app",
  messagingSenderId: "243678310804",
  appId: "1:243678310804:web:9aa1ee2adcc9be181d5f81",
  measurementId: "G-BVNW3PBRE3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };