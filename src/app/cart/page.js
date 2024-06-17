'use client'
import { useState, useEffect } from "react"
import readUserCart from "../components/ReadCart/ReadCart"
import { useAuth } from "../authContext/AuthContext"
import DrinkItemFromCart from "../components/ReadCart/DrinkItemFromCart"

export default function CartPage ()
{
    const [cart,setCart] = useState([])
    const {user} = useAuth();




    // const fetchCart = async () => 
    //     {
    //       if(!user) return null;
    
    //       try {
    //         // getDrinkByID works by having a collection then a certain id passed 
    //         // so we can use it here
    //         const cartData = await getDrinkById('users', user.uid);
    //         // cartData returns the UID, ID and email UID == ID they are the same
    //         setCart(cartData.cart)
    //       } catch (error) {
    //         console.error('Error fetching Cart:', error);
    
    //       }
    //     };

    const fetchUserCart = async () =>
        {
            try {
                const cartData = await readUserCart(user.uid)
                console.log(cartData)
                setCart(cartData)
            } catch (error) {
                console.error('Erorr fetching cart:', error)
            }
        }
    
      useEffect(() => {
        fetchUserCart();
      }, []);

    return(
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
            />
        </div>
        ))}

        </main>
    )
}