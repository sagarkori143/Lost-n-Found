'use client'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation';
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
      <div className='flex p-4'>
        <div className='p-4'>
      {user ? (
        <div>
        
        <Drawer>
        <DrawerTrigger asChild>
          <Button variant="destructive">User</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Hi {user.displayName || user.email}</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                  
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                
              </div>
              <div className="mt-3 h-[120px]">
                
              </div>
            </div>
            <DrawerFooter>
            <button onClick={handleSignOut}>
            Sign Out
        </button>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
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
      <Items/>
    </div>
    

    </div>
  );
};

export default Dashboard;
