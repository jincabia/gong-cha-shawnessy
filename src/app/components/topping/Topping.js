'use client';
import { useState } from "react";

const Toppings = ({ name, price, onChange, disableIncrement }) => {
  const [counter, setCounter] = useState(0);

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
    <div className="flex flex-col items-center mx-5 py-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-md font-semibold">{name}</h1>
          <h1 className="text-sm text-gray-700 ml-2">${price.toFixed(2)}</h1>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <button
            className="bg-slate-400 text-white rounded-full px-5 md:px-7 py-1"
            onClick={handleDecrement}
            disabled={counter === 0}
          >
            -
          </button>
          <span className="mx-2 md:mx-4">{counter}</span>
          <button
            className="bg-slate-400 text-white rounded-full px-5 md:px-7 py-1"
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
