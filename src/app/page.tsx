'use client'; // Mark the file as a client-side component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const HomePage = () => {
  const [loggedIn,setUserLoggedIn]=useState(false);
  const [loading, setLoading]=useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard'); // Redirect to dashboard if logged in
      } else {
        setUserLoggedIn(false);
        setLoading(false);
        //router.push('/test')
        router.push('/auth/signin'); // Redirect to sign-in if not logged in
      }
    });

    return () => unsubscribe(); 
  }, [router]);

  return (
    loading?
    <div>

    </div>
    :
    (
      <div>
       <h1>Please login first using the institute mail ID</h1>
      </div>
    )
  )
};

export default HomePage;
