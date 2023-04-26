// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNpgSO3i0k-zp7qi5sgRe3KQc6kIC8BsA",
    authDomain: "productivitypal-7ddd8.firebaseapp.com",
    projectId: "productivitypal-7ddd8",
    storageBucket: "productivitypal-7ddd8.appspot.com",
    messagingSenderId: "471008261844",
    appId: "1:471008261844:web:db6c8c9af1d24cf7a7ed41",
};

// Initialize Firebase
export const fire_app = initializeApp(firebaseConfig);

// Firestore
export const fire_db = getFirestore(fire_app);
export const users_collection = collection(fire_db, "users");

// Initialize Firebase Authentication and get a reference to the service
export const fire_auth = getAuth(fire_app);
