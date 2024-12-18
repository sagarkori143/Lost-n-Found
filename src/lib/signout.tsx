import { signOut, getAuth } from 'firebase/auth';
import { auth } from './firebase'; // Your Firebase instance

// Reusable Sign-Out Function
export const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
