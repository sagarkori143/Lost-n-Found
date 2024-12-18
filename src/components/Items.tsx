import React from 'react'
import {data} from "../app/_data";
import ItemCard, { ItemProp } from './ItemCard';
 function Items() {
    
  return (
    <div>
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
       {data.map((item:ItemProp,index)=>(
        <ItemCard key={item.id} item={item} index={index}/>
       ))}
     </section>
   </div>
  )
}

export default Items