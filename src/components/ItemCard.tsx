"use client";
import Image from "next/image";
import { MotionDiv } from './MotionDiv'
import { useEffect, useState } from "react";
import mail from './../../public/gmail.png'
import whatsapp from './../../public/whatsapp.png'
import call from './../../public/telephone.png'

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

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }

}

function ItemCard({ item, index }: Prop) {
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
    blue: 'bg-green-500',
    red: 'bg-red-500',

  }
  const color = item.type == "Lost" ? "red" : "blue";
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
        className="max-w-md rounded-xl rounded-t-xl relative w-full bg-[#1A1D29] border-[2px] border-gray-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Image Section */}
        <div className="relative w-full h-[30vh] overflow-hidden rounded-t-lg" onClick={() => setIsModalOpen(true)}>
          <Image
            src={item.imageUrls[0]}
            alt={item.title}
            fill
            className="rounded-t-xl  "
          />
        </div>

        <div className="py-4 px-4 flex flex-col gap-3" onClick={() => setIsModalOpen(true)}>
          <div className="flex justify-between items-center gap-2">
            <h2 className="font-bold text-white text-lg lg:text-xl line-clamp-1 w-full">
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
          <div className="">
            <p className="text-gray-300 text-sm align-baseline">Reported by <span className="font-bold">{item.username}</span><span className="text-[12px] text-gray-500">{` ${time}`}</span> </p>
          </div>

          {/* Optional Additional Details */}

        </div>
      </MotionDiv>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[rgba(213,203,203,0.08)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-[10px] border border-[rgba(213,203,203,0.74)] rounded-2xl text-sm lg:text-lg md:text-lg m-4 p-4 lg:p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-md text-white lg:text-lg font-bold mb-4">{item.title}</h2>
            <p className="text-sm text-white">
              <strong>Description:</strong> {item.description}
            </p>
            <div className="flex flex-col gap-2 mt-4">
              
              {item.phone.length >= 10 && (
                <p className="flex gap-2 items-center">
                  <Image src={call} height={25} width={25} alt="Call" />
                  <a
                    href={`tel:${item.phone}`}
                    className="text-blue-500 font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.phone}
                  </a>
                </p>
              )}

              {item.email.length > 0 && (
                <p className="flex gap-2 items-center">
                  <Image src={mail} height={25} width={25} alt="Mail" />
                  <a
                    href={`mailto:${item.email}`}
                    className="text-blue-500 font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.email}
                  </a>
                </p>
              )}

              {item.whatsapp && (
                <p className="flex gap-2 items-center">
                  <Image src={whatsapp} height={25} width={25} alt="WhatsApp" />
                  <a
                    href={`https://wa.me/91${item.whatsapp}`}
                    className="text-blue-500 font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  {item.whatsapp}
                  </a>
                </p>
              )}

              <p className="flex items-baseline mt-2">
                <span className="text-white text-sm">
                  {item.type} on:{" "}
                  {item.dateLostFound.split("T")[0].split("-").reverse().join("-")}
                </span>
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
