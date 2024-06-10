'use client';
import { useState } from "react";

const Toppings = ({ name, price }) => {
    const [counter, setCounter] = useState(0);

    const handleIncrement = () => {
        setCounter(counter + 1);
    };

    const handleDecrement = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };

    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <h1 className="text-lg font-semibold">{name}</h1>
                <h1 className="text-md text-gray-700">${price.toFixed(2)}</h1>
            </div>
            <div className="flex items-center">
                <button 
                    className="bg-slate-400 text-white rounded-full px-4 " 
                    onClick={handleDecrement}
                    disabled={counter === 0}
                >
                    -
                </button>
                <span className="mx-4">{counter}</span>
                <button 
                    className="bg-slate-400 text-white rounded-full px-4 " 
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Toppings;
