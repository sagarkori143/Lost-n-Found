'use client'; // Mark the file as a client-side component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const HomePage = () => {
  const [loading, setLoading]=useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard'); // Redirect to dashboard if logged in
      } else {
        setLoading(false);
        router.push('/login'); // Redirect to sign-in if not logged in
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
