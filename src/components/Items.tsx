import React, { useState } from 'react';
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
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');

  if (!data) {
    return <p className='text-white text-[18px] lg:text-[22px]'>No data available.</p>;
  }

  // Filter logic
  const filteredData = data.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'lost') return item.type.toLowerCase() === 'lost';
    if (filter === 'found') return item.type.toLowerCase() === 'found';
    return true;
  });

  // Sort logic
  const sortedData = filteredData.sort((a, b) => {
    if (sort === 'newest') {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    if (sort === 'oldest') {
      return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    }
    if (sort === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className='w-[89%]'>
      <div className="flex justify-between mb-4 pr-2 pl-1 lg:pr-[75px] lg:pl-2">
        {/* Filter Options */}
        <select
          className="h-[25px] lg:h-[30px] border rounded-md bg-black text-white border-gray-500 p-1 text-[12px] lg:text-[17px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        {/* Sort Options */}
        <select
          className="h-[25px] lg:h-[30px] border rounded-md bg-black text-white border-gray-500 p-1 text-[12px] lg:text-[17px]"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 h-[40%] w-[100%]">
        {sortedData.map((item: ItemProp, index) => (
          <ItemCard key={item._id} item={item} index={index} />
        ))}
      </section>
    </div>
  );
};
