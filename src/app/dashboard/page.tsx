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
import Loader from '@/components/ui/loader';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
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
import { Items } from '@/components/Items';
import add from './../../../public/add.png'
import add2 from './../../../public/icons8-plus-100.png';


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

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/'); // Redirect to sign-in if not logged in
      } else {
        setUser(user);
        console.log("Current user:", user);
        const roll = user.email?.split('@')[0];
        if (roll) setRollNumber(roll.toUpperCase());
      }
    });

    const fetchData = async () => {
      try {
        // Use the local host one while working on local host
        const response = await fetch("https://lost-n-found-orcin.vercel.app/api/items", {
        //const response = await fetch("http://localhost:3000/api/items", {
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
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }
    };
    fetchData();
    return () => unsubscribe();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  return (
    <div className=" h-full min-h-[100vh] w-full bg-fixed bg-black bg-grid-white/[0.2] relative flex flex-col pt-4">
      {loading ?
        <div className=' h-[100vh] flex w-full justify-center items-center text-white'>
          <Loader />
        </div>

        :
        <div className='w-full flex flex-col items-center'>
          <div className="bg-[rgba(213,203,203,0.21)] flex justify-center rounded-full w-[85%] lg:w-[60%] h-[45px] lg:h-[65px] pl-3 sticky top-4 z-10 shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-[7.5px] border border-[rgba(213,203,203,0.74)]">
            <div className='flex justify-between w-[100%] lg:pl-2 lg:pr-4 items-center'>
              <Link href="/" >
                <div className='flex justify-center items-center text-center z-10 '>
                  <Image
                    height={40}
                    width={40}
                    alt="logo"
                    src={logo}
                    className="z-10 w-[23px] h-[23px] sm:w-8 sm:h-8 md:w-10 md:h-10"
                  />
                  <h1 className='ml-1 text-[15px] lg:text-[22px] text-bold text-white z-10'>Lost and found</h1>
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
                              <Image width={45} height={45} src={user.photoURL} alt='UserImage'
                                className="z-10 w-[25px] h-[25px] lg:h-[40px] lg:w-[40px]"
                              />
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
                            <div className='flex items-center z-10'>
                              
                              <Image width={100} height={100} src={user.photoURL} alt='UserImage' className='z-10 w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-[50%]' />
                              
                              <div className='pl-5'>
                                <DrawerTitle>Hi {user.displayName || user.email} 👋</DrawerTitle>
                              </div>
                            </div>
                            
                            <DrawerDescription>
                            <p className='text-left lg:text-[17px] flex flex-col '> <span>{rollNumber}</span>  Indian institute of information technology, Jabalpur</p>
                            </DrawerDescription>
                          </DrawerHeader>

                          <DrawerFooter>
                            <Button className='h-6 lg:h-[30px] text-[13px] bg-red-700 hover:bg-red-800 font-semibold' onClick={handleSignOut}>Sign Out</Button>
                            <DrawerClose asChild>
                              <Button variant="outline" className='h-6 lg:h-[30px] text-[13px] font-semibold'>Close</Button>
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

            </div>
          </div>
          <div className='fixed bottom-2 right-5 mb-2 lg:m-8 cursor-pointer z-10 active:scale-95 ease-in-out' onClick={togglePopup}>
            <Image
              height={50}
              width={50}
              alt="logo"
              src={add2}
              className="z-10 hover:scale-110 lg:h-[70px] lg:w-[70px] transition-all ease-in-out duration-300 "
            />
          </div>


          <div className='flex w-[86%] mt-[20px] mb-[50px] flex-col place-items-center items-center justify-center pb-2 '>
            <Items data={data} />
          </div>


          {isPopupOpen ? (
            <div className="text-white fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 " onClick={togglePopup}>
              <div className="bg-[rgba(213,203,203,0.08)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-[10px] border border-[rgba(213,203,203,0.74)] rounded-3xl overflow-auto flex-col justify-center items-center lg:p-6 lg:m-6 p-2 lg:max-h-[80vh] h-full max-h-[60vh] w-full max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]" onClick={(e) => e.stopPropagation()}>
                <h1 className='text-center text-[15px] lg:text-[20px]'>Report new item!</h1>
                <ReportItemPopup />
                <div className='pt-3 items-center flex justify-end'><Button variant="destructive" className='h-[23px] mb-2 mr-2 lg:h-[32px]' onClick={togglePopup}>Cancel</Button></div>
              </div>
            </div>
          ) : ("")}
        </div>}
    </div>
  );
};

export default Dashboard;
