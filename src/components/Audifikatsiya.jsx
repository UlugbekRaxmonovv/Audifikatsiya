import { initializeApp, getApps} from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8KiOGUurOyJb9zKU3g01Q9BRCWrytY_8",
    authDomain: "login-b1e67.firebaseapp.com",
    projectId: "login-b1e67",
    storageBucket: "login-b1e67.firebasestorage.app",
    messagingSenderId: "490453755881",
    appId: "1:490453755881:web:8c2db9dfeed4b562d94d78"
  };
  const app =initializeApp(firebaseConfig)
  
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { auth, provider };