'use client'
import Image from "next/image";
import { useState } from 'react';
import { IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { grey } from "@mui/material/colors";
import { useAuth } from '@/app/authContext/AuthContext';
import updateCartQuantity from "./AdjustQuantity";
import { useRouter } from "next/navigation";
import ImageComponent from "../image/ImageComponent";

export default function DrinkItemFromCart({ drink, removeDrinkFromCart, index, onQuantityChange }) {
    const { drinkName, ice, price, size, sugar, toppings, quantity,drinkID } = drink;

    const [quantityVar, setQuantityVar] = useState(quantity);
    const [deleting, setDeleting] = useState(false);
    const [expand, setExpand] = useState(false);

    const router = useRouter();
  
    const handleRemove = () => {
      setDeleting(true); // Show spinner or loading indicator
      setTimeout(() => {
        removeDrinkFromCart(index); // Example function to remove item from cart
        setDeleting(false); // Hide spinner or loading indicator
      }, 1000);
    };
  
    const handleAddition = () => {
      const newQuantity = quantityVar + 1;
      setQuantityVar(newQuantity);
      onQuantityChange(newQuantity);
    };
  
    const handleSubtraction = () => {
      if (quantityVar > 1) {
        const newQuantity = quantityVar - 1;
        setQuantityVar(newQuantity);
        onQuantityChange(newQuantity);
      }
    };
  
    const toppingCounts = toppings.reduce((acc, topping) => {
      const name = topping.product_name;
      if (acc[name]) {
        acc[name].count += 1;
      } else {
        acc[name] = { ...topping, count: 1 };
      }
      return acc;
    }, {});
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 lg:w-1/2 lg:mx-auto">
        {deleting ? (
          <div className="flex text-center items-center justify-center">
            <div className="spinner mx-auto w-1/2" style={{ width: 100, height: 100 }}></div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-evenly">
            <div className="w-1/3 sm:w-1/4 h-fit p-4 rounded-lg shadow-lg flex items-center justify-center text-center hover:drop-shadow-xl my-5">
              {/* {drinkName ? (
                <Image
                  src={`/${drinkName}.png`}
                  width={100}
                  height={100}
                  className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48"
                  alt={drinkName}
                />
              ) : (
                <div className="spinner" style={{ width: 100, height: 100 }}></div>
              )} */}

              <ImageComponent imagePath={`${drinkName}.png`}/>

            </div>
            <div>
              <h1 className="text-sm font-semibold mx-auto w-fit  text-center my-5">{drinkName}</h1>
              <div className="col-span-4 flex items-center justify-center">
                {quantityVar === 1 && (
                  <button
                    className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                    onClick={handleRemove}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </button>
                )}
                {quantityVar > 1 && (
                  <button
                    className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                    onClick={handleSubtraction}
                  >
                    -
                  </button>
                )}
                <span className="mx-2 md:mx-4">{quantityVar}</span>
                <button
                  className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                  onClick={handleAddition}
                >
                  +
                </button>
              </div>
              <div className="justify-center text-center mt-5">
                <h1>${(price * quantityVar).toFixed(2)}</h1>
              </div>
            </div>
          </div>
        )}
  
        <Collapse in={expand} timeout="auto" unmountOnExit>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <h2 className="text-gray-700">Size:</h2>
              <h2 className="text-gray-700">{size}</h2>
            </div>
            <div className="flex justify-between mb-2">
              <h2 className="text-gray-700">Sugar:</h2>
              <h2 className="text-gray-700">{sugar}</h2>
            </div>
            <div className="flex justify-between mb-2">
              <h2 className="text-gray-700">Ice:</h2>
              <h2 className="text-gray-700">{ice}</h2>
            </div>
  
            <div className="my-4">
              <h2 className="text-lg font-semibold mb-2">Toppings:</h2>
              {Object.keys(toppingCounts).length > 0 ? (
                Object.values(toppingCounts).map((topping, index) => (
                  <div key={index} className="flex justify-between mb-1">
                    <h3 className="text-gray-700">
                      {topping.product_name} {topping.count > 1 ? `${topping.count}x` : ''}
                    </h3>
                    <p className="text-gray-700">${(topping.product_price * topping.count).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No toppings added</p>
              )}
            </div>
          </div>

        <div className="text-center justify-center items-center pb-5">
          <button onClick={()=> router.push(`/cart/${index}`)} className="bg-slate-500 px-5 text-white rounded-full">Edit</button>
        </div>



        </Collapse>

  
        <div
          className="flex items-center justify-center text-center border-t-2 border-gray-50"
          onClick={() => setExpand(!expand)}
        >
          {expand ? (
            <ExpandLessIcon sx={{ color: grey[900] }} />
          ) : (
            <ExpandMoreIcon sx={{ color: grey[900] }} />
          )}
        </div>
      </div>
    );
  }
  