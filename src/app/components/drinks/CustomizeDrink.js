'use client'
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToppings } from '../../components/drinks/toppings/retrieveToppings';
import Image from 'next/image';
import { getDrinkById } from '@/app/components/drinks/retrieveDrink';
import Toppings from '../topping/Topping';
/*
[name] - is for dynamic routing for each drink

Maybe change the params to the id and then use it to search into db?

PARAMETERS
ID - we'll use the id to query through the database and show the info

TODO 
- add customization 
- add to cart
- add to order

*/ 



const CustomizeDrink = () => {
// When printing params, it only display name for some reason?
  const params = useParams();
  const drinkID = params.id;


// These 2 variables are used to read from the database
  const [drink,setDrink] = useState([]);
  const [toppings, setToppings] = useState([]);

// The variables will be changed based on user pref
  const [drinkToppings, setDrinkToppings] = useState([]) 
  const [size, setSize] = useState("medium");
  const [sugar, setSugar] = useState("100");
  const [ice, setIce] = useState("regular");
  const [toppingCounter, setToppingCounter] = useState(0)

  
// price of the drink
const [price,setPrice] = useState(drink.product_price)
  
    const fetchToppings = async () => {
      try {
        const toppingData = await getToppings();
        setToppings(toppingData);
        // console.log(id)
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDrink = async () => {
      try {
        const drinkData = await getDrinkById('drinks', drinkID);
        setDrink(drinkData);
      } catch (error) {
        console.error('Error fetching drink:', error);
      }
    };

  useEffect(() => {

    fetchDrink();
    fetchToppings();
  }, []);

 const handleToCart = () =>{}

  

  return (
    <div className='text-black'>

        <div className='w-1/2 mx-auto sm:w-64 h-fit p-4 rounded-lg shadow-lg items-center justify-between text-center hover:drop-shadow-xl mb-5'>
        {drink.product_name ? (
          <img
            src={`/${drink.product_name}.png`}
            width={100}
            height={100}
            style={{ width: 'auto', height: 'auto' }}
            className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48"
            alt={drink.product_name}
          />
        ) : (
          <div
            style={{ width: 100, height: 100 }}
            className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48 flex justify-center items-center mx-auto"
          >
            <div className={"spinner"}></div>
          </div>
        )}
      </div>



      {/* Render customization options here */}


      <div>
        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          Sugar:
          <select value={sugar} onChange={(e) => setSugar(e.target.value)}>
            <option value="100">100%</option>
            <option value="70">70%</option>
            <option value="50">50%</option>
            <option value="30">30%</option>
            <option value="0">30%</option>
            <option value="0">0%</option>

          </select>
        </label>
        <label>
          Ice:
          <select value={ice} onChange={(e) => setIce(e.target.value)}>
            <option value="no-ice">No Ice</option>
            <option value="less-ice">Less Ice</option>
            <option value="regular">Regular</option>
            <option value="extra-ice">Extra Ice</option>
          </select>
        </label>
      </div>


    {/* When adding toppings only have 4 max but can have 2x pearls  */}
    {/* Display all toppings from DB */}
        {toppings.map((topping) => (
        <div key={topping.id}>
          <Toppings name={topping.product_name} price={topping.product_price} />
        </div>
      ))}





















    {/* If you clikc this itll cause an error cuz its not assigneed to */}
      <button onClick={''}>Add to Cart</button>



    </div>
  );
};

export default CustomizeDrink;
