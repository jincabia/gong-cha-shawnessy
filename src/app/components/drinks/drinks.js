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
    <div>
      <button onClick={handleClick}>
        <div className='w-full sm:w-64 h-min p-4 rounded-lg shadow-lg flex flex-col items-center justify-between text-center '> {/* hover:drop-shadow-xl */}
          
          <div className='flex justify-center items-center'>
            <ImageComponent imagePath={`${name}.png`}/>
          </div>
        </div>
        <div className='flex items-start justify-around mt-4'>
          <h1 className='text-black font-semibold w-fit text-xs mb-2 truncate'>{name}</h1>
        </div>
      </button>
    </div>
  );
};

export default Drink;
