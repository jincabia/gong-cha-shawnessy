
'use client'
import { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthContext";
import readUserCart from "../components/ReadCart/ReadCart";
import { useRouter } from "next/navigation";
import removeDrinkFromCartInFirebase from "../components/ReadCart/DeleteFromCart";
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart";
import updateCartQuantity from "../components/ReadCart/AdjustQuantity";
import ImageComponent from "../components/image/ImageComponent";
import { EmptyCart } from "./EmptyCart";
import SignIn from "../signin/page";
import { getCartData } from "../components/drinks/retrieveDrink";

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



  const removeDrinkFromCart = async (index) => {
    try {
      await removeDrinkFromCartInFirebase(user.uid, index);
      const updatedCart = cart.filter((_, i) => i !== index);
      calculateSubtotal(updatedCart);
      setLoading(false)
      setCart(updatedCart);
      
    } catch (error) {
      console.error('Error removing drink from cart:', error);
    }
  };

  useEffect(()=>
  {
    setLoading(false)
  },[cart])

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
      {!user && <div>
          <SignIn></SignIn>
        
        </div>}

      {user && 
      <div>
        
        
      {!cart || cart.length === 0 ? (
        <>

          {loading ? (
            <div className="flex items-center text-center justify-center mt-48 bg-gray-200 shadow-md w-min mx-auto p-10 rounded-xl">
              <div className="spinner p-10"></div>

            </div>

          ):(
            <>
              <EmptyCart/>
              {/* <h1>There is nothing inside your cart, check out our Menu!</h1>
              <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={() => router.push('/menu')}>
                Our Menu
              </h1> */}
            
            </>

          )}

        </>
      ) : (
        <>
          {cart.map((drink, index) => (
            <div key={index} className="pt-4 even:py-6" >
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
            <div className="lg:w-1/2 lg:mx-auto">
              <div className="flex justify-between mt-2 mx-4 text-large font-medium">
                <h2>Subtotal</h2>
                <h2 className=""> ${subtotal.toFixed(2)}</h2>
              </div>
              <p className="mx-4 text-sm text-slate-500 mb-10">Tax Not Included</p>
            </div>
            
          )}

          {/* Add tax and total */}
          
        </>
      )}
      </div>}
    </main>
  );
}
