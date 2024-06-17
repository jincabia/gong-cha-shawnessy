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
        <div className="spinner" style={{ width: 100, height: 100 }}></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      {/* Button is to show drink data, just for testing */}
      {/* <button onClick={()=> console.log(drinks)}>CLick here </button> */}

      <ul className="grid grid-cols-2 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">

        {!drinks} 

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
