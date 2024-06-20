'use client'
import { useState,useEffect } from "react";

const Toppings = ({ name, price, onChange, disableIncrement,initialCount }) => {





  const [counter, setCounter] = useState(0);

  

  const ChangeInitialCount = () =>
    {
      if(initialCount)
        {
          setCounter(initialCount)
        }
    }
  


    useEffect(() => {
      ChangeInitialCount();
    }, []);

  const handleIncrement = () => {
    if (disableIncrement) return;
    setCounter(counter + 1);
    onChange(true);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      onChange(false);
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
        <div className="col-span-4 flex items-center justify-end">
          <button
            className="bg-slate-400 text-white rounded-full px-4 md:px-7 py-0"
            onClick={handleDecrement}
            disabled={counter === 0}
          >
            -
          </button>

          <span className="mx-2 md:mx-4">{counter}</span>

          <button
            className="bg-slate-400 text-white rounded-full px-4 md:px-7 py-0"
            onClick={handleIncrement}
            disabled={disableIncrement}
          >
            +
          </button>
        </div>
      </div>
</div>

  );
};

export default Toppings;
