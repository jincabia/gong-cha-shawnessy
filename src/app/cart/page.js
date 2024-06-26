
'use client'
import { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthContext";
import readUserCart from "../components/ReadCart/ReadCart";
import { useRouter } from "next/navigation";
import removeDrinkFromCartInFirebase from "../components/ReadCart/DeleteFromCart";
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart";
import updateCartQuantity from "../components/ReadCart/AdjustQuantity";

export default function CartPage() {
  // database cart
  const [cart, setCart] = useState([]);

  
  const [subtotal, setSubtotal] = useState(0);

  const [priceLoading, setPriceLoading] = useState(true)

  const { user } = useAuth();
  const router = useRouter();

  const [loading,setLoading] = useState(false)

  useEffect(() => {
    fetchUserCart();
  }, []);

  const fetchUserCart = async () => {
    try {
      setLoading(true)
      const cartData = await readUserCart(user.uid);
      console.log(cartData)
      if (!cartData || cartData.length === 0) {
        setLoading(false);
        return;
      }
      
      setCart(cartData);
      calculateSubtotal(cartData);
      setPriceLoading(false)
      setLoading(false)



    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateSubtotal = (cartData) => {
    if (!cartData || cartData.length === 0) {
      // console.log('fart')
      setSubtotal(0);
      setLoading(true)
      return;
    }

    let total = 0;
    cartData.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubtotal(total);
  };

  // useEffect(() => {
  //   //Runs only on the first render
  //   calculateSubtotal();
  // }, [cart]);

  const removeDrinkFromCart = async (index) => {
    try {
      await removeDrinkFromCartInFirebase(user.uid, index);
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
      setLoading(false)

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
      setPriceLoading(false);
      calculateSubtotal(updatedCart);
      setPriceLoading(true)

      // Then update quantity in backend
      await updateCartQuantity(user.uid, index, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }

    setPriceLoading(false);



  };

  return (
    <main className="text-black">
      {!cart || cart.length === 0 ? (
        <>

          {loading ? (
            <div className="flex items-center text-center justify-center mt-48 bg-gray-200 shadow-md w-min mx-auto p-10 rounded-xl">
              <div className="spinner p-10"></div>

            </div>

          ):(
            <>
              <h1>There is nothing inside your cart, check out our Menu!</h1>
              <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={() => router.push('/menu')}>
                Our Menu
              </h1>
            
            </>

          )}

        </>
      ) : (
        <>
          {cart.map((drink, index) => (
            <div key={index} className="even:py-6" >
              <DrinkItemFromCart
                drink={drink}
                index={index}
                removeDrinkFromCart={removeDrinkFromCart}
                onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
              />
            </div>
          ))}

          {priceLoading ? (
            // If it is loading play spinner
            <div className="flex text-center justify-center items-center  mx-auto my-4">
              <div className="spinner text-center justify-center items-center"></div>
            </div>
          ):(
            // If the price is not loading
            <div className="text-center my-4">
              <h2 className="">Subtotal: ${subtotal.toFixed(2)}</h2>
            </div>
          )}

          {/* Add tax and total */}
          
        </>
      )}
    </main>
  );
}
