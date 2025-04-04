import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAK2v6wbzfczORJbH5VUmo-a1KBtR-PUg",
    authDomain: "rickflix-d01da.firebaseapp.com",
    projectId: "rickflix-d01da",
    storageBucket: "rickflix-d01da.firebasestorage.app",
    messagingSenderId: "998203088896",
    appId: "1:998203088896:web:99974c24a8b05f505b78e5"
  };

const firebaseapp = initializeApp(firebaseConfig);
const fire = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

export { fire, auth }