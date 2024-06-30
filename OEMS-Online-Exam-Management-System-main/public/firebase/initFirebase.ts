// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAh1f0X6Xt-HfNeOcmHh_zf6Vv3jzjpJb4",
  authDomain: "sust-oems.firebaseapp.com",
  projectId: "sust-oems",
  storageBucket: "sust-oems.appspot.com",
  messagingSenderId: "104639466431",
  appId: "1:104639466431:web:ded3f07cc5c7b66de4af0a",
  measurementId: "G-FCDN68CLX9",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export const storageRef = ref(storage);
