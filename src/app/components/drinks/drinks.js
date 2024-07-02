'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Drink = ({ name, price, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${id}`);
  };

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
              alt={name}
              priority
            />
          </div>
        </div>
        <div className='flex items-start justify-around flex-grow mt-4'>
          <h1 className='text-black font-semibold w-fit text-xs mb-2 truncate'>{name}</h1>
        </div>
      </button>
    </div>
  );
};

export default Drink;
