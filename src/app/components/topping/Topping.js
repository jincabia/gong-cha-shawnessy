'use client'
import { useState,useEffect } from "react";

const Toppings = ({ name, price, onChange, disableIncrement,initialCount =0,index  }) => {

  const [decreaseDisabled, setDecreaseDisabled] = useState(true);
  const [increaseDisabled, setIncreaseDisabled] = useState(false);




  const [counter, setCounter] = useState(0);

  

  const ChangeInitialCount = () =>
    {
      if(initialCount !== undefined && initialCount)
        {
          setCounter(initialCount)
        }
    }
  


    useEffect(() => {
      ChangeInitialCount();
    }, [initialCount]);

  const handleIncrement = () => {
    
    if (disableIncrement) return;
    setCounter(counter + 1);
    onChange(true,index);
    setDecreaseDisabled(false)

    if(counter === 3)
    {
      setIncreaseDisabled(true)
    }
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      onChange(false,index);
    }
    setIncreaseDisabled(false)
    if (counter ===1) {
      setDecreaseDisabled(true)
    }
  };

  return (
    <div className="topping-item border-b border-black py-8 w-4/5 mx-auto">
      <div className="container mx-auto grid grid-cols-8 gap-5 items-center">
        {/* Name */}
        <div className="col-span-2 flex items-center justify-start">
          <h1 className="text-sm font-semibold">{name}</h1>
        </div>

        {/* Price */}
        <div className="col-span-2 flex items-center justify-center">
          <h1 className="text-sm text-gray-700 ml-2">${price.toFixed(2)}</h1>
        </div>

        {/* Counter */}
        <div className="col-span-4 flex items-center text-end justify-end ml-auto h-8 bg-gray-300 w-min rounded-full text-black">
          <button
            className="  rounded-full px-4 md:px-7 py-0"
            onClick={handleDecrement}
            disabled={counter === 0}
          >
            {decreaseDisabled && (
              <p className="text-gray-500">-</p>
            )}
            {!decreaseDisabled && (

              <p>-</p>
            )}
            
            
          </button>

          <span className="">{counter}</span>

          <button
            className="  rounded-full px-4 md:px-7 py-0"
            onClick={handleIncrement}
            disabled={disableIncrement}
          >

            {increaseDisabled && (
              <p className="text-gray-500">+</p>
            )}
            {!increaseDisabled && (

              <p>+</p>
            )}
          </button>
        </div>


        
      </div>
</div>

  );
};

export default Toppings;
