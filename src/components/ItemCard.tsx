"use client";
import Image from "next/image";
import {MotionDiv} from './MotionDiv'
import { useEffect,useState } from "react";
// export interface ItemProp {
//   id: string;
//   name: string;
//   image: {
//     original: string;
//   };
//   kind: string;
 
//     episodes: number;
//     episodes_aired: number;
//     score: string;
  
// }
export interface ItemProp {
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

}
interface Prop {
  item: ItemProp;
  index: number;
}

const variants={
  hidden:{opacity:0},
  visible:{opacity:1}

}

function ItemCard({ item,index }: Prop) {
  const [time, setTime] = useState("");
  useEffect(() => {
    // Time calculator:
    const calculateTimeAgo = (dateString: string): string => {
      const now = new Date();
      const date = new Date(dateString);
      const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} minutes ago`;
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} hours ago`;
      } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days} days ago`;
      }
    };
    setTime(calculateTimeAgo(item.dateAdded));
  }, [])
  const colorVariants = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    
  }
  const color= item.type=="Lost"?"red":"blue";
  return (
    <MotionDiv
  variants={variants}
  initial="hidden"
  animate="visible"
  transition={{
    delay: index * 0.25,
    ease: 'easeInOut',
    duration: 0.5,
  }}
  viewport={{ amount: 0 }}
  className="max-w-md rounded-lg relative w-full bg-[#1A1D29] shadow-lg hover:shadow-xl transition-shadow duration-300"
>
  {/* Image Section */}
  <div className="relative w-full h-[37vh] overflow-hidden rounded-t-lg">
    <Image
      src={item.imageUrls[0]}
      alt={item.title}
      fill
      className="rounded-t-xl  "
    />
    {/* Title and Time Overlay */}
    
  </div>

  {/* Details Section */}
  <div className="py-4 px-4 flex flex-col gap-3">
    {/* Title and Type */}
    <div className="flex justify-between items-center gap-2">
      <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
        {item.title}
      </h2>
      <div className={`py-1 px-2 ${colorVariants[color]} rounded-sm`}>
        <p className="text-white text-sm font-bold capitalize">
          {item.type}
        </p>
      </div>
    </div>
    <div className="flex gap-4 items-center text-white pb-4">
      {item.description}
      {/* Add more details here if needed */}
    </div>
    <div className="absolute bottom-0 left-0 right-0  px-4 py-2">
      
      <p className="text-gray-300 text-sm">Reported by <span className="font-bold">{item.username} </span>{` ${time}`}</p>
    </div>

    {/* Optional Additional Details */}
    
  </div>
</MotionDiv>
    // <MotionDiv
    //  variants={variants}
    //  initial='hidden'
    //  animate='visible'
    //  transition={{
    //   delay:index*0.25,
    //   ease:'easeInOut',
    //   duration:0.5
    //  }}
    //  viewport={{amount:0}}
    //  className="max-w-md rounded relative w-full">
    //   <div className="relative w-full h-[37vh]">
    //     <Image
    //       src={item.imageUrls[0]}
    //       alt={item.title}
    //       fill
    //       className={`${colorVariants[color]}`}
    //     />
    //   </div>
    //   <div className="py-4 flex flex-col gap-3">
    //     <div className="flex justify-between items-center gap-1">
    //       <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
    //         {item.title}
    //       </h2>
    //       <div className="py-1 px-2 bg-[#161921] rounded-sm">
    //         <p className="text-white text-sm font-bold capitalize">
              
    //           {item.type}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="flex gap-4 items-center">
          
          
    //     </div>
    //   </div>
    // </MotionDiv>
  );
}



export default ItemCard;