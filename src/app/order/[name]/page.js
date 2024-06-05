'use client'
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getToppings } from '../../components/drinks/toppings/retrieveToppings';

const CustomizeDrink = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const name = params.name;
  const price = searchParams.get('price');

  const [toppings, setToppings] = useState([]);
  const [size, setSize] = useState([]);
  const [sugar, setSugar] = useState([]);
  const [ice, setIce] = useState([]);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const toppingData = await getToppings();
        setToppings(toppingData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchToppings();
  }, []);

  const handleAddToCart = () => {
    // Add drink to cart with selected options
  };

  return (
    <div>
      <h1>Customize your {name}</h1>
      <p>Price: ${price}</p>
      {/* Render customization options here */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CustomizeDrink;
