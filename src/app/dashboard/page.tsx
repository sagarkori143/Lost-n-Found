'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../../public/lost (2).png'
import { handleSignOut } from '@/lib/signout';
import { Button } from "@/components/ui/button"
import ReportItemPopup from '@/components/ReportItem';
import Link from 'next/link';
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
import {Items} from '@/components/Items';



const Dashboard = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [rollNumber, setRollNumber] = useState<String | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  type DataType = {
    collegeEmail: string;
    dateAdded: string;
    dateLostFound: string;
    description: string;
    email: string;
    imageUrls: string[];
    phone: string;
    photoURL: string;
    rollNo: string;
    status: string;
    title: string;
    type: string;
    username: string;
    whatsapp: string;
    __v: number;
    _id: string;
  };
  
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if (!user) {
        router.push('/login'); // Redirect to sign-in if not logged in
      } else {
        setUser(user);
        console.log("Current user:", user);
        const roll = user.email?.split('@')[0];
        if (roll) setRollNumber(roll.toUpperCase());
      }
    });
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items", {
          method: "GET",
         
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result: DataType[] = await response.json(); // Ensure the correct type
        setData(result);
        
        
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    // Call the asynchronous function
    fetchData();
    
    

    return () => unsubscribe();
  }, []);
  
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="h-full w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className=' flex-col items-center'>
        <div className='flex justify-between pl-6 pr-6 items-center'>
          <Link href="/">
          <div className='flex justify-center items-center  text-center z-10'>
            <Image height={45} width={45} alt='logo' src={logo} className='z-10' />
            <h1 className='text-[22px] text-bold text-white'>Lost and found</h1>
          </div>
          </Link>
          <div className='p-4'>
            {user ? (
              <div>
                <Drawer>
                  <DrawerTrigger asChild>
                    {
                      user ? (
                        <div className='relative rounded-[50%] cursor-pointer overflow-hidden '>
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
                        <div className='flex z-10'>
                          <div className='align-center h-[50px] w-[50px] rounded-[50%] border-solid border-[2px] cursor-pointer overflow-hidden'>
                            <Image width={100} height={100} src={user.photoURL} alt='UserImage' className='z-10' />
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
            <button onClick={togglePopup} className='bg-green-400 p-3 rounded-2xl text-white active:scale-90'>Report item</button>
          </div>
        </div>
        <div className='p-8'>
          <Items data={data} />
        </div>


        {isPopupOpen ? (
          <div className="text-white fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 " onClick={togglePopup}>
            <div className="bg-black border-[2px] border-white overflow-auto flex-col justify-center items-center lg:p-6 lg:m-6 p-2 rounded-3xl shadow-lg max-h-[80vh] h-full w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw]" onClick={(e) => e.stopPropagation()}>
              <h1 className='text-center text-[20px]'>Report new item!</h1>
              <ReportItemPopup />
              <div className='pt-3 items-center flex justify-end'><Button variant="destructive" onClick={togglePopup}>Cancel</Button></div>
            </div>
          </div>
        ) : ("")}
      </div>
    </div>
  );
};

export default Dashboard;
