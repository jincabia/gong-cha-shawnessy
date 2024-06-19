'use client'
import Image from "next/image";
import { useState } from 'react';
import { IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function DrinkItemFromCart({ drink, removeDrinkFromCart,index }) {
  const { drinkName, ice, price, size, sugar, toppings } = drink;

  const [quantity, setQuantity] = useState(1);
  const [expand, setExpand] = useState(false);


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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-row items-center justify-evenly">
        <div className="w-1/3 sm:w-1/4 h-fit p-4 rounded-lg shadow-lg flex items-center justify-center text-center hover:drop-shadow-xl my-5">
          {drinkName ? (
            <Image
              src={`/${drinkName}.png`}
              width={100}
              height={100}
              className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48"
              alt={drinkName}
            />
          ) : (
            <div className="spinner" style={{ width: 100, height: 100 }}></div>
          )}
        </div>
        <div>
          <h1 className="text-sm font-semibold mx-auto sm:w-1/4 text-center my-5">{drinkName}</h1>
            <div className="col-span-4 flex items-center justify-center">
                
                {/* Garbage Icon to delete the item */}
                {quantity === 1 && (
                <button
                    className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                    onClick={()=>removeDrinkFromCart(index)}
                >
                    <DeleteOutlineIcon fontSize="small"/>
                </button>

                )}

                {/* Remove 1 from the quantity */}
                {quantity > 1 && (
                    <button
                    className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                    onClick={() => setQuantity(quantity - 1)}
                >
                    -
                </button>
                )}

                <span className="mx-2 md:mx-4">{quantity}</span>
                <button
                    className="bg-slate-400 text-white rounded-full px-4 md:px-7"
                    onClick={() => setQuantity(quantity + 1)}
                >
                    +
                </button>
                </div>


            <div className="justify-center text-center mt-5">
                <h1>${(price * quantity).toFixed(2)}</h1>
            </div>    
        </div>
      </div>

    
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
                    {topping.product_name} {topping.count > 1 ? `x${topping.count}` : ''}
                  </h3>
                  <p className="text-gray-700">${(topping.product_price * topping.count).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No toppings added</p>
            )}
          </div>

          
        </div>
      </Collapse>
        
      <div className="flex items-center justify-center text-center border-t-2 border-gray-50">
        <IconButton onClick={() => setExpand(!expand)}>
          {expand ? (
            <div >

                <ExpandLessIcon className=" text-slate-600 rounded-full " />
            </div>
          ) : (
            <ExpandMoreIcon className=" text-slate-600 rounded-full" />
          )}
        </IconButton>
      </div>

    </div>
  );
}
