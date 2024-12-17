'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../../lib/firebase'
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/lib/signout';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router= useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to sign-in if not logged in
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
        <div>
      {user ? (
        <h1>Welcome, {user.displayName || user.email}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <div>
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    </div>
    </div>
  );
};

export default Dashboard;
