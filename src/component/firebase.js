// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrLzRdzmYmabYTxeexxiSp0dpYzS0EcG0",
  authDomain: "mvinet-fc650.firebaseapp.com",
  projectId: "mvinet-fc650",
  storageBucket: "mvinet-fc650.appspot.com",
  messagingSenderId: "263578370919",
  appId: "1:263578370919:web:868dcde8f64d1ed67e25c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
