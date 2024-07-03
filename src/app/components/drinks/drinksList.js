'use client';
import { useEffect, useState } from 'react';
import { getDrinks } from './retrieveDrink';
import Drink from './drinks';
// import ImageComponent from './ImageComponent';
import ImageComponent from '../image/ImageComponent';

const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchDrinks();
  }, []);

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
    <div className="container mx-auto p-4 flex justify-center items-center">
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {drinks.map((drink) => (
          <li key={drink.id} className="flex flex-col justify-center items-center">
            {/* <ImageComponent imagePath={`${drink.product_name}.png`} /> */}
            <Drink name={drink.product_name} price={drink.product_price} id={drink.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksList;
