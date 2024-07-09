'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ImageComponent from '../image/ImageComponent';

const Drink = ({ name, price, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${id}`);
  };

  return (
    <div className='h-64'>
      <button onClick={handleClick}>
        <div className=' sm:w-64 md:w-52 h-min p-4 rounded-lg shadow-xl flex flex-col items-center justify-between text-center '> {/* hover:drop-shadow-xl */}
          
          <div className='flex justify-center items-center'>
            <ImageComponent imagePath={`${name}.png`}/>
          </div>
        </div>
        <div className='flex items-start justify-around mt-4'>
          <h1 className='text-black font-semibold w-3/4 text-xs mb-2 '>{name}</h1>
        </div>
      </button>
    </div>
  );
};

export default Drink;
