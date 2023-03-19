import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4bPMGCiomNkHFLObjHQYgKPTz3JhwqJM",
    authDomain: "shopping-bach-gia-phat.firebaseapp.com",
    projectId: "shopping-bach-gia-phat",
    storageBucket: "shopping-bach-gia-phat.appspot.com",
    messagingSenderId: "275078520182",
    appId: "1:275078520182:web:812c46659ddc818d9d6e57",
    measurementId: "G-144D32LR7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = firebase.auth();

// const analytics = getAnalytics(app);

export const authByFirebase = getAuth(app);
