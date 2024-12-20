import React from 'react'
import {data} from "../app/_data";
import ItemCard, { ItemProp } from './ItemCard';
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




export const Items: React.FC<{ data: DataType[] | null }> = ({ data }) => {
  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 h-[40%] w-[95%]">
       {data.map((item:ItemProp,index)=>(
        <ItemCard key={item._id} item={item} index={index}/>
       ))}
     </section>
    </div>
  );
};