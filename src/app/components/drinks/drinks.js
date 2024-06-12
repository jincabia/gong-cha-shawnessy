
'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/*

when importing useRouter use 'next/navigation'

when we click onto a drink it redirects us to a customize page. 


There we can 
Customize drink -->
Add customized drink to cart 



*/




// Drink Component
const Drink = ({ name, price, id }) => {
  const router = useRouter();

  const handleClick = () => {


    /**
     * 
     * ppl can change the URL and the page will be affected
     * maybe just pass in the ID and then find it in database?
     *
     */
    router.push(`/menu/${id}`);
  };
  


  // Styling and showing any needed info
  return (
    <div>
      <button onClick={handleClick}>

        <div className='w-full sm:w-64 h-fit p-4 rounded-lg shadow-lg flex flex-col items-center justify-between text-center hover:drop-shadow-xl'>
          <div className='flex justify-center items-center'>

            <Image 
              src={`/${name}.png`} 
              width={100} 
              height={100} 
              style={{ width: 'auto', height: 'auto' }} 
              className='sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48' 
              alt={name}/>

          </div>
        </div>

        <div className='flex flex-col items-start justify-start flex-grow mt-4'>
          <h1 className='text-black font-semibold w-fit text-xs mb-2 truncate'>{name}</h1>
          {/* <p className='text-black text-sm'>${price}</p> */}
        </div>
        
      </button>
    </div>
  );
};

export default Drink;
