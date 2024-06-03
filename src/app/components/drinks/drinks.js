
import React from 'react';
import Image from 'next/image';



// Drink Component
// TODO onclick component then customize drink then add to cart then order
const Drink = ({ name, price }) => {

  // Milk Tea w/ Pearls

// to have custom imgs set all photos to the name var? for examples EGMT with 3J img = name maybe

  return (
    <div>

      <div className='w-full sm:w-64 h-fit p-4 rounded-lg shadow-lg flex flex-col items-center justify-between text-center hover:drop-shadow-xl' >
        <div className='flex justify-center items-center'>
          <Image 
            // src={'/Milk Tea w_ Pearls.png'} 
            src={`/${name}.png`} 
            width={100} 
            height={100} 
            className='sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48' 
            alt={name} 
          />
        </div>



       
      </div>
      <div className='flex flex-col items-start justify-start flex-grow mt-4'>
          <h1 className='text-black font-semibold w-fit text-xs mb-2 truncate '>{name}</h1>
          <p className='text-black text-sm'>${price}</p>
        </div>


    </div>

  );
};

export default Drink;

