'use client';
import React, { useEffect, useState } from 'react';
import { getDrinks } from './retrieveDrink';
import Drink from './drinks';

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
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinks.map(drink => (
          <li key={drink.id} className="list-none">
            <Drink name={drink.product_name} price={drink.product_price} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinksList;
