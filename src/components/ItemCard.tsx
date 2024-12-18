"use client";
import Image from "next/image";
import {MotionDiv} from './MotionDiv'

export interface ItemProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
 
    episodes: number;
    episodes_aired: number;
    score: string;
  
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
  return (
    <MotionDiv
     variants={variants}
     initial='hidden'
     animate='visible'
     transition={{
      delay:index*0.25,
      ease:'easeInOut',
      duration:0.5
     }}
     viewport={{amount:0}}


     className="max-w-sm rounded relative w-full">
      <div className="relative w-full h-[37vh]">
        <Image
          src={item.image.original}
          alt={item.name}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {item.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {item.kind}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          
          
        </div>
      </div>
    </MotionDiv>
  );
}

export default ItemCard;
