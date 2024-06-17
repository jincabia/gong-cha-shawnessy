
'use client'
import { useState, useEffect } from "react";
import readUserCart from "../components/ReadCart/ReadCart";
import { useAuth } from "../authContext/AuthContext";
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart";

export default function CartPage() {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const fetchUserCart = async () => {
    try {
      const cartData = await readUserCart(user.uid);
      console.log(cartData);
      setCart(cartData.map(item => ({ ...item, count: 1 })));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].count > 1) {
      newCart[index].count -= 1;
      setCart(newCart);
    }
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);
    setCartPrice(total);
  }, [cart]);

  return (
    <main className="text-black">
      {cart.map((drink, index) => (
        <div key={index} className="py-5">
          <DrinkItemFromCart
            drinkName={drink.drinkName}
            ice={drink.ice}
            price={drink.price}
            size={drink.size}
            sugar={drink.sugar}
            toppings={drink.toppings}
            count={drink.count}
            onIncrease={() => handleIncrease(index)}
            onDecrease={() => handleDecrease(index)}
          />
        </div>
      ))}
      <div className="mt-6 p-4 border-t">
        <h2 className="text-lg font-semibold text-red-700">Total Price: ${cartPrice.toFixed(2)}</h2>
      </div>
    </main>
  );
}