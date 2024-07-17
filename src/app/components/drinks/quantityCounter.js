'use client'
import React, { useState } from "react";

export const QuantityCounter = ({quantity,setQuantity}) => {
    // const [counter, setCounter] = useState(quantity);
    const[decrementDisabled, setDecrementDisabled] = useState(false)

    const decrementCounter = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
        if(quantity === 2)
        {
            setDecrementDisabled(false)
        }
    };

    const incrementCounter = () => {
        setQuantity(prev => prev + 1);
        setDecrementDisabled(true)

    };

    return (
        <div className="col-span-4 flex items-center text-start justify-start  h-8 bg-gray-300 w-min mx-auto rounded-full text-black">
            <button
                className=" rounded-full px-4 md:px-7 py-0 mx-auto"
                onClick={decrementCounter}
                disabled={quantity === 1}
            >

                    {decrementDisabled && (
                        <p >-</p>
                    )}



                {!decrementDisabled && (
                    <p className="text-gray-500">-</p>
                )}
                
            </button>

            <span className="mx-2 md:mx-4">{quantity}</span>

            <button
                className=" rounded-full px-4 md:px-7 py-0 mx-auto"
                onClick={incrementCounter}
            >
                +
            </button>
        </div>
    );
};
