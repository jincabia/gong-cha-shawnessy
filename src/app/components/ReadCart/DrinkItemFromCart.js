import Image from "next/image";
import { useMemo } from "react";

export default function DrinkItemFromCart({ drinkName, ice, price, size, sugar, toppings, count, onIncrease, onDecrease }) {
  // Count the occurrences of each topping
  const countedToppings = useMemo(() => {
    const toppingCounts = toppings.reduce((acc, topping) => {
      acc[topping.product_name] = (acc[topping.product_name] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(toppingCounts).map(([name, count]) => ({ name, count }));
  }, [toppings]);

  return (
    <div className="border p-4 rounded-lg shadow-lg mb-6 w-full max-w-md mx-auto bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <Image
          src={`/${drinkName}.png`}
          width={100}
          height={100}
          className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48 mb-4"
          alt={drinkName}
        />
        <div className="sm:ml-4">
          <h1 className="text-lg sm:text-xl font-bold mb-2 ">{drinkName}</h1>
          <div className="flex flex-col mb-4">
            <span className="text-gray-600">Ice: {ice}</span>
            <span className="text-gray-600">Size: {size}</span>
            <span className="text-gray-600">Sugar: {sugar}</span>
          </div>
          <h2 className="text-md sm:text-lg font-semibold mb-2">Price: ${price.toFixed(2)}</h2>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button onClick={onDecrease} className="bg-red-700 text-white px-2 py-1 rounded">-</button>
        <span className="text-lg">{count}</span>
        <button onClick={onIncrease} className="bg-red-700 text-white px-2 py-1 rounded">+</button>
      </div>
      <div>
        <h2 className="text-md sm:text-lg font-semibold mt-4 mb-2">Toppings:</h2>
        {countedToppings.map((topping, index) => (
          <div key={index} className="border-t pt-2 mt-2">
            <h3 className="text-sm sm:text-md">
              {topping.count > 1 ? `${topping.count}x` : ""} {topping.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
