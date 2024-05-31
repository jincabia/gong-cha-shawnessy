// import React from 'react';
// import Image from 'next/image';

// const Drink = ({ name, price }) => {
//   return (
//     <div className='bg-slate-400 w-full sm:w-64 h-80 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between text-center'>
//       <div className='flex justify-center items-center'>
//         <Image 
//           src={'/Milk Tea w_ Pearls.png'} 
//           width={100} 
//           height={100} 
//           alt={name} 
//         />
//       </div>
//       <div className='flex flex-col items-center justify-center flex-grow mt-4'>
//         <h1 className='text-black font-semibold mb-2 truncate w-fit sm:text-xs md:text-md lg:text-lg '>{name}</h1>
//         <p className='text-black text-md'>${price}</p>
//       </div>
//     </div>
//   );
// };

// export default Drink;

import React from 'react';
import Image from 'next/image';

const Drink = ({ name, price }) => {
  return (
    <div className='bg-slate-400 w-full sm:w-64 h-80 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between text-center'>
      <div className='flex justify-center items-center'>
        <Image 
          src={'/Milk Tea w_ Pearls.png'} 
          width={100} 
          height={100} 
          className='sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48' 
          alt={name} 
        />
      </div>
      <div className='flex flex-col items-center justify-center flex-grow mt-4'>
        <h1 className='text-black font-semibold mb-2 truncate w-full sm:text-sm md:text-md lg:text-lg'>{name}</h1>
        <p className='text-black text-md'>${price}</p>
      </div>
    </div>
  );
};

export default Drink;

