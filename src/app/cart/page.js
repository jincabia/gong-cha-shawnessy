'use client'
import { useState, useEffect } from "react"
import readUserCart from "../components/ReadCart/ReadCart"
import { useAuth } from "../authContext/AuthContext"
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart"
import { useRouter } from "next/navigation";
import removeDrinkFromCartInFirebase from "../components/ReadCart/DeleteFromCart"

export default function CartPage () {
  const [cart, setCart] = useState()
  const { user } = useAuth();

  const router = useRouter();

  const fetchUserCart = async () => {
    try {
      const cartData = await readUserCart(user.uid)
      console.log(cartData)
      setCart(cartData)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  useEffect(() => {
    fetchUserCart();
  }, []);

  const removeDrinkFromCart = async (index) => {
    try {
      await removeDrinkFromCartInFirebase(user.uid, index);
      setCart(cart.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing drink from cart:', error);
    }
  }

  return(
    <main className="text-black">

    {!cart || cart.length === 0  && (
        <>
            <h1>There is nothing inside your cart, check out our Menu!</h1>

            <h1 className="text-stone-900 p-3 w-fit mx-auto mb-4" onClick={()=>router.push('/menu')}>
              Our Menu
            </h1>
        </>
    )}

    {cart &&(
        <>
        {cart.map((drink, index) => (
        <div key={index} className="odd:py-10">
          <DrinkItemFromCart
            userId={user.uid}
            drink={drink}
            index={index}
            removeDrinkFromCart={ removeDrinkFromCart}
          />
        </div>
      ))}
        </>
    )}
      
    </main>
  )
}
