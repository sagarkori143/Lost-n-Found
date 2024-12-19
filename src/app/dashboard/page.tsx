'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../public/lost (1).png'
import { handleSignOut } from '@/lib/signout';
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Items from '@/components/Items';



const Dashboard = () => {

  const [user, setUser] = useState<any>(null);
  const [rollNumber, setRollNumber] = useState<String | null>(null)
  const router = useRouter();
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login'); // Redirect to sign-in if not logged in
      } else {
        setUser(user);
        console.log("Current user:", user);
        const roll = user.email?.split('@')[0];
        if (roll) setRollNumber(roll.toUpperCase());
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div>
      <div className='flex justify-between pl-6 pr-6 items-center'>
        <div className='flex justify-center items-center  text-center'>
          <Image height={45} width={45} alt='logo' src={logo} />
          <h1 className='text-[22px] text-bold'>Lost and found</h1>
        </div>
        <div className='p-4'>
          {user ? (
            <div>
              <Drawer>
                <DrawerTrigger asChild>
                  {
                    user ? (
                      <div className='rounded-[50%] cursor-pointer overflow-hidden'>
                        <Image width={45} height={45} src={user.photoURL} alt='UserImage' />
                      </div>
                    )
                      :
                      (
                        <Button>User</Button>
                      )
                  }
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <div className='flex '>
                        <div className='align-center h-[50px] w-[50px] rounded-[50%] border-solid border-[2px] cursor-pointer overflow-hidden'>
                          <Image width={100} height={100} src={user.photoURL} alt='UserImage' />
                        </div>
                        <div className='pl-5 mt-4'>
                          <DrawerTitle>Hi {user.displayName || user.email} 👋</DrawerTitle>
                        </div>
                      </div>
                      <div><h3 className='pl-4 text-left'>{rollNumber}</h3></div>
                      <DrawerDescription>Indian institute of information technology, Jabalpur</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                      <Button className='bg-red-700 hover:bg-red-800' onClick={handleSignOut}>Sign Out</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className='fixed bottom-0 right-0 p-5 z-10'>
          <button className='bg-green-400 p-3 rounded-2xl text-white active:scale-90'>Report item</button>
        </div>
      </div>
      <div className='p-8'>
        <Items />
      </div>


    </div>
  );
};

export default Dashboard;
