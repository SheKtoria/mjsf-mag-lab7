import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCYy3FiGHZy7V_wEBEauXEHNyn8-xqi4PA",
    authDomain: "my-project-vue-c794e.firebaseapp.com",
    projectId: "my-project-vue-c794e",
    storageBucket: "my-project-vue-c794e.appspot.com",
    messagingSenderId: "397156391821",
    appId: "1:397156391821:web:d877d6ed4b02a63ca7bbc4",
    measurementId: "G-TYLJGJ0LGW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()