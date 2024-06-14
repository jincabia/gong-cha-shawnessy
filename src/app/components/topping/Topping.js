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
    <div className="topping-item border-b border-black py-8 w-4/5 mx-auto ">
      <div className="container mx-auto grid grid-cols-8 gap-5 items-center">
        <div className="col-span-5 flex items-center">
          <h1 className="text-md font-semibold">{name}</h1>
          <h1 className="text-sm text-gray-700 ml-2">${price.toFixed(2)}</h1>
        </div>
        <div className="col-span-3 flex items-center justify-end space-x-2 md:space-x-4">
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
