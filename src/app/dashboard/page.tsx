'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
      <div className='flex p-4'>
        <div className='p-4'>
          {user ? (
            <div>

              <Drawer>
                <DrawerTrigger asChild>
                  {
                    user ? (
                      <div className='h-[50px] w-[50px] rounded-[50%] cursor-pointer overflow-hidden'>
                        <Image width={100} height={100} src={user.photoURL} alt='UserImage' />
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
            <p>Loading...</p>
          )}
        </div>


        <div className='mx-auto w-1/2 bg-gray-200 p-4 text-center'>
          Lost and found
        </div>
        <div className='p-4'>
          Report Lost/Found
        </div>
      </div>
      <div className='p-8'>
        <Items />
      </div>


    </div>
  );
};

export default Dashboard;
