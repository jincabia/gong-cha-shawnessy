'use client'
import { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthContext";
import readUserCart from "../components/ReadCart/ReadCart";
import { useRouter } from "next/navigation";
import removeDrinkFromCartInFirebase from "../components/ReadCart/DeleteFromCart";
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart";
import updateCartQuantity from "../components/ReadCart/AdjustQuantity";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    try {
      const cartData = await readUserCart(user.uid);
      setCart(cartData);
      calculateSubtotal(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateSubtotal = (cartData) => {
    if (!cartData || cartData.length === 0) {
      setSubtotal(0);
      return;
    }

    let total = 0;
    cartData.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  };

  const removeDrinkFromCart = async (index) => {
    try {
      await removeDrinkFromCartInFirebase(user.uid, index);
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
    } catch (error) {
      console.error('Error removing drink from cart:', error);
    }
  };

  const handleQuantityChange = async (index, newQuantity) => {
    try {
      // Update quantity locally first
      const updatedCart = cart.map((item, idx) =>
        idx === index ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      calculateSubtotal(updatedCart);

      // Then update quantity in backend
      await updateCartQuantity(user.uid, index, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  return (
    <main className="text-black">
      {!cart || cart.length === 0 ? (
        <>
          <h1>There is nothing inside your cart, check out our Menu!</h1>
          <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={() => router.push('/menu')}>
            Our Menu
          </h1>
        </>
      ) : (
        <>
          {cart.map((drink, index) => (
            <div key={index} className="odd:py-10">
              <DrinkItemFromCart
                drink={drink}
                index={index}
                removeDrinkFromCart={removeDrinkFromCart}
                onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
              />
            </div>
          ))}
          <div className="text-center">
            <h2 className="">Subtotal: ${subtotal.toFixed(2)}</h2>
          </div>
        </>
      )}
    </main>
  );
}
