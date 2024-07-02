'use client';
import { useEffect, useState } from 'react';
import { getDrinks } from './retrieveDrink';
import Drink from './drinks';

const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksData = await getDrinks();
        setDrinks(drinksData);

        const imagePromises = drinksData.map(drink => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = `/${drink.product_name}.png`;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        setError('Failed to fetch drinks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading || !imagesLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner" style={{ width: 100, height: 100 }}></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <ul className="grid grid-cols-2 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {drinks.map((drink) => (
          <li key={drink.id} className="list-none flex justify-center items-center">
            <Drink name={drink.product_name} price={drink.product_price} id={drink.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksList;
