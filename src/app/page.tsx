'use client'; // Mark the file as a client-side component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { BackgroundLines } from '@/components/ui/background-lines';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import go from './../../public/go.png'
import key from './../../public/key.png'
import Image from 'next/image';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       setLoggedIn(true);
      } else {
        setLoading(false);
       // router.push('/login'); // Redirect to sign-in if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleClick = ()=>{
    if(loggedIn)router.push('/dashboard')
    else router.push('/login')
  }

  const words1 = [
    {
      text: "Let's",
    },
    {
      text: "find",
    },
    {
      text: "your",
    },
    {
      text: "Lost",
      className: "text-blue-500 dark:text-blue-500",
    }, {
      text: "belongings",
    }, {
      text: "And",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "convey",
    }, {
      text: "the",
    },
    {
      text: "ones",
    },
    {
      text: "you",
    },
    {
      text: "have",
    },
    {
      text: "Found.",
      className: "text-blue-500 dark:text-blue-500",
    }
  ];

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-neutral-600 to-white text-4xl md:text-5xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Found Something?, <br /> Or Lost Something?
        <br/>
      </h2>
      <TypewriterEffect words={words1} />
      <br />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className='z-20'
      >
        <Button className='bg-white hover:bg-slate-300 text-black text-[18px] cursor-pointer z-20 w-[200px] font-bold' onClick={handleClick}>
          {loggedIn ? 
          (
            <div className='flex justify-center items-center gap-2'>
              <p>Dashboard</p>
              <Image className='mb-1' src={go} height={20} width={20} alt=""/>
            </div>
          ) 
          :
          (
            <div className='flex justify-center items-center gap-2'>
              <p>Login</p>
              <Image src={key} height={25} width={25} alt=""/>
            </div>
          )
          }
        </Button>
      </motion.div>
    </BackgroundLines>
  )
};

export default HomePage;
