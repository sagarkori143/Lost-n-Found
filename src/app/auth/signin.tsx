'use client'; // Mark as a client-side component

import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase'
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Email login handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the email is from the institute domain
    if (!email.endsWith('@yourinstitute.com')) {
      setError('Please use your institute email.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard if login is successful
    } catch (err) {
      setError('Failed to log in. Please check your email/password and try again.');
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Ensure the email is from the institute domain
      if (user.email && !user.email.endsWith('@yourinstitute.com')) {
        await auth.signOut(); 
        setError('Please use your institute email.');
      } else {
        router.push('/dashboard'); // Redirect to dashboard if login is successful
      }
    } catch (err) {
      setError('Failed to log in with Google.');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Your institute email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login with Email</button>
      </form>

      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default SignInPage;  // Make sure this is a default export
