'use client';
import { useEffect, useState } from 'react';
import { getDrinks,addDrinksToCartData,getCartData } from './retrieveDrink';
import DrinksCarousel from '../carousel/DrinksCarousel';
import Drink from './drinks';
import Filter from './filterDrinks';

const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksData = await getDrinks();
        setDrinks(drinksData);
      } catch (error) {
        setError('Failed to fetch drinks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    

    const fetchCartData = async () =>
      {
        try{
          const cartData = await getCartData();
        }
        catch(error)
        {
          console.error(error)
        }

      }

    const addDrinks = async () =>
    {
      try{
        await addDrinksToCartData();
      }
      catch(error)
      {
        console.log('wtf')
        console.log(error)
      }
    }

    fetchDrinks();
    addDrinks();
    fetchCartData();

  }, []);

  const bestSellers = drinks.filter(drink => 
    ['Brown Sugar MT with Pearls', 'Milk Tea with Pearls', 'Panda Milk Foam'].includes(drink.product_name)
  );

  const filteredDrinks = selectedCategory === 'All' 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className='text-center'>
        <div className='flex items-center justify-between pb-5'>
          <div className='flex-grow border-t border-slate-300'></div>
          <span className='mx-4 text-2xl text-red-800  font-serif'>Our top sellers</span>
          <div className='flex-grow border-t border-slate-300'></div>
        </div>
        <h1 className='text-black'></h1>
      </div>

      <DrinksCarousel drinks={bestSellers} />

      <div className='text-center pt-5'>
        <div className='flex items-center justify-between pb-5'>
          <div className='flex-grow border-t border-slate-300'></div>
          <span className='mx-4 text-2xl text-red-800  font-serif'></span>
          <div className='flex-grow border-t border-slate-300'></div>
        </div>
        <h1 className='text-black'></h1>
      </div>

      {/* Filter Component */}

      <div className='mb-10 lg:w-1/3 mx-auto '>

        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} className="" />
      </div>

      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5">
        {filteredDrinks.map((drink) => (
          <li key={drink.id} className="flex flex-col justify-center items-center">
            <Drink name={drink.product_name} price={drink.product_price} id={drink.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksList;
