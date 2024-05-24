// components/ItemsList.js
'use client'
import { useEffect, useState } from 'react';
import { fetchDrinks } from '../_services/gongchaServices';

const ItemsList = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const drinksList = await fetchDrinks();
      setDrinks(drinksList);
    };

    getItems();
  }, []);

  return (
    <div>
      <h1 className='text-black'>Items</h1>
      <ul>
        {drinks.map((drink, index) => (
          <li className='text-black' key={index}>{drink.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
