// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAxvVpcRjR0naomu6pIOMwhnR0L6VEmdSE",
  authDomain: "doctor-appointment-d7115.firebaseapp.com",
  projectId: "doctor-appointment-d7115",
  storageBucket: "doctor-appointment-d7115.appspot.com",
  messagingSenderId: "588413501259",
  appId: "1:588413501259:web:dfd2c51480519ef36db2ce",
  measurementId: "G-51KHXTE553"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

export  {db};