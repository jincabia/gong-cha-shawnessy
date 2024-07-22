
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
import {  red } from "@mui/material/colors";
import SignIn from "../signin/page";
import { getCartData } from "../components/drinks/retrieveDrink";
import { CircularProgress, Button, Box, Typography, Slide } from "@mui/material";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [priceLoading, setPriceLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserCart();
  }, []);
  

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const cartData = await readUserCart(user.uid);
      if (!cartData || cartData.length === 0) {
        setLoading(false);
        return;
      }
      setCart(cartData);
      calculateSubtotal(cartData);
      setPriceLoading(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
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
      const removedDrink = cart[index];
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
      await removeDrinkFromCartInFirebase(user.uid, index);
    } catch (error) {
      console.error('Error removing drink from cart:', error);
    }
  };

  const handleQuantityChange = async (index, newQuantity) => {
    try {
      setPriceLoading(true);
      const updatedCart = cart.map((item, idx) =>
        idx === index ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
      await updateCartQuantity(user.uid, index, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
    finally{
      setPriceLoading(false);
    }
  };

  return (
    <main className="text-black">
      {!user && <SignIn />}
      {user && (
        <Box>
          {!cart || cart.length === 0 ? (
            loading ? (
              <Box className="flex items-center text-center justify-center mt-48 bg-gray-200 shadow-md w-min mx-auto p-10 rounded-xl">
                <CircularProgress sx={{ color: red[900] }}/>
              </Box>
            ) : (
              <EmptyCart />
            )
          ) : (
            <>
              {cart.map((drink, index) => (
                <Slide direction="up" in={true} mountOnEnter unmountOnExit key={index}>
                  <Box className="pt-4 even:py-6">
                    <DrinkItemFromCart
                      drink={drink}
                      index={index}
                      removeDrinkFromCart={removeDrinkFromCart}
                      onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                    />
                  </Box>
                </Slide>
              ))}
              {priceLoading ? (
            // If it is loading play spinner
            <div className="flex text-center justify-center items-center  mx-auto mb-10 ">
              <div className="spinner text-center justify-center items-center"></div>
            </div>
          ):(
            // If the price is not loading
            <div className="lg:w-1/2 lg:mx-auto h-1/2 mb-5">


            <div className="flex justify-between items-center  text-lg font-medium mx-4 lg:mx-0">
                <h2>Subtotal</h2>
                <h2 className="  text-right">${(subtotal).toFixed(2)}</h2>
            </div>

              <p className=" text-sm text-slate-500 mx-4 lg:mx-0">Tax Not Included</p>

            
            {window.innerWidth <= 768 ? (
              <div>
                 <div className="w-1/2 mx-auto justify-center text-center my-4">

                      <button className=" bg-red-800 rounded-md py-2 px-4 text-white shadow-md w-fit" 
                      >
                        <a href='tel:403-453-4273' className=' font-semibold text-sm'> Call {`(403) 453-4273`} </a> 

                      </button>

                  </div>
                
              </div>
              
            )
            :
            (
              <div className="w-fit mx-auto my-4">
                                
                  <p className=" text-sm font-semibold text-slate-500 mx-4 lg:mx-0"> Call {`(403) 453-4273`} </p>
                  <p  className=" text-sm font-semibold text-slate-500 mx-4 lg:mx-0"> to place your order.</p>

                
              </div>
            )}

           

              


      </div>
            
            
          )}
            </>
          )}
        </Box>
      )}
    </main>
  );
}
