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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <>
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
    <div className="text-white text-sm line-clamp-3">
            {item.description}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-400 underline text-sm"
          >
            View More
          </button>
    <div className="mt-auto">
      
      <p className="text-gray-300 text-sm">Reported by <span className="font-bold">{item.username} </span>{` ${time}`}</p>
    </div>

    {/* Optional Additional Details */}
    
  </div>
</MotionDiv>
{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">{item.title}</h2>
            <p className="text-sm text-gray-700">
              <strong>Description:</strong> {item.description}
            </p>
            <div className="mt-4">
              <p>
                <strong>Contact:</strong>{" "}
                <span className="text-blue-500">{item.phone}</span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <span className="text-blue-500">{item.email}</span>
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <span className="text-blue-500">{item.whatsapp}</span>
              </p>
              <p>
                <strong>Date {item.type}:</strong>{" "}
                <span className="text-gray-700">{item.dateLostFound}</span>
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
</>

  );
}

export default ItemCard;
