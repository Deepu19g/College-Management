
import { initializeApp } from "firebase/app";
import {
    getFirestore
} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgqvMkCutELhVJ1R3p1SsMpfRZCLrxXP4",
  authDomain: "collegeapp-a6ac6.firebaseapp.com",
  projectId: "collegeapp-a6ac6",
  storageBucket: "collegeapp-a6ac6.appspot.com",
  messagingSenderId: "308645680920",
  appId: "1:308645680920:web:31cbc1315f695c25ea306d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore()

export default db