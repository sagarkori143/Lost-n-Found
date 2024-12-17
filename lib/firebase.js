// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getAnalytics } from 'firebase/analytics';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBIEjFmv9mDgN-LNf4J10aGg-Gx6nISyy0",
  authDomain: "lostnfound-a4fd0.firebaseapp.com",
  projectId: "lostnfound-a4fd0",
  storageBucket: "lostnfound-a4fd0.firebasestorage.app",
  messagingSenderId: "259076361141",
  appId: "1:259076361141:web:560f2847b556ee6bfe27fc",
  measurementId: "G-ESCV8KBHZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Auth initialization
const analytics = getAnalytics(app);

export { auth };
