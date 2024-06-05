'use client';
import { useEffect, useState } from 'react';
import { getDrinks } from './retrieveDrink';
import Drink from './drinks';


// Used to show all drinks in the collection drinks in firebase database
const DrinksList = () => {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  /**
   * When reading from the collection drinks we also
   * have category, so we can add a sorting method.
   * 
   * TODO 
   *  - sorting method
   *  - loading animations --> line 45
   * 
   * 
   * 
   * 
   */
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinksData = await getDrinks();
        console.log()
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



  // TODO Maybe loading animation
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <ul className="grid grid-cols-2 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">

        {drinks.map((drink) => (
          <li key={drink.id} className="list-none flex justify-center items-center">
            <Drink name={drink.product_name} price={drink.product_price} />
          </li>
        ))}
      </ul>

    </div>
  );
  
};

export default DrinksList;
