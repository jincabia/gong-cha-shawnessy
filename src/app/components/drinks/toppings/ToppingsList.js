'use client'

import { getToppings } from "./retrieveToppings";
import { useEffect, useState } from "react";
import Toppings from "../../topping/Topping";
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const restrictionsMap = {
    0: [],
    1: ['MediumSizeOnly'],
    2: ['GreaterThanLessIce', 'NotAvailableHot'],
    3: ['GreaterThan0PercentSugar'],
    4: ['IceNotAdjustable', 'NotAvailableHot'],
    5: ['SugarNotAdjustable'],
    6: ['GreaterThanLessIce', 'NotAvailableHot', 'GreaterThan0PercentSugar'],
    7: ['MediumSizeOnly', 'IceNotAdjustable', 'NotAvailableHot', 'SugarNotAdjustable'],
    8: ['SugarNotAdjustable', 'GreaterThanLessIce', 'NotAvailableHot']
};

// TODO 
// Check if Soy swap is available

const CustomButton = styled(Button)({
    backgroundColor: '#8B0000', // equivalent to bg-red-800
    borderRadius: '0.375rem', // equivalent to rounded-md
    padding: '0.5rem 1rem', // equivalent to py-2 px-4
    color: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // equivalent to shadow-md
    '&:hover': {
        backgroundColor: '#AB0000', // custom hover color
    },
});


export const ToppingsList = ({ handleToppingChange, toppingCount, drink,soy,handleSoy }) => {
    const [toppings, setToppings] = useState([]);
    const [showAllToppings, setShowAllToppings] = useState(false);
    



    const fetchToppings = async () => {
        try {
            const toppingData = await getToppings();
            setToppings(toppingData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchToppings();
    }, []);

    // Presents recommended toppings first 
    const filterAndLimitToppings = (toppings) => {


        let initialToppingsNames;

        
        let initialToppings = [];
        let remainingToppings = [];

        if (drink.category === 'Milk Tea' || drink.category === 'Milk Foam' )
        {
            initialToppingsNames = ['Black Pearls', 'White Pearls', 'Coffee Jelly', 'Coconut Jelly'];
        }

        if(drink.category === 'Smoothie' || drink.category ==='Fruit Tea')
        {
            initialToppingsNames = ['Black Pearls', 'Mango Pearls', 'White Pearls', 'Coconut Jelly']
        }
        else {
            initialToppingsNames = ['Black Pearls', 'Mango Pearls', 'White Pearls', 'Strawberry Pearls']
        }

        
        
        initialToppings = toppings.filter(topping => initialToppingsNames.includes(topping.product_name));
        remainingToppings = toppings.filter(topping => !initialToppingsNames.includes(topping.product_name));

        return {
            initialToppings,
            remainingToppings,
        };
    };

    const { initialToppings, remainingToppings } = filterAndLimitToppings(toppings);

    const getToppingCount = (toppingId) => {
        if(drink.toppings !== undefined && drink.toppings)
        {
            return drink.toppings.filter(t => t.id === toppingId).length;
        }
    };

    return (
        <div className="">
            <div>
                {initialToppings.map((topping,index) => (
                    <div key={topping.id}>
                        <Toppings
                            name={topping.product_name}
                            price={topping.product_price}
                            onChange={(isAdding) => handleToppingChange(topping, isAdding,index)}
                            disableIncrement={toppingCount >= 4}
                            // Make the initial Count equal the number of ids that match the topping id inside drink.toppings
                            initialCount={getToppingCount(topping.id)}
                        />
                    </div>
                ))}
            </div>

            

            {/* This is for the soy */}
            <div className="topping-item border-b border-black py-8 w-4/5 mx-auto ">
                    <div className="container mx-auto grid grid-cols-8 gap-5 items-center ">
                    
                        {/* Name */}
                        <div className="col-span-2 flex items-center justify-start ">
                            <h1 className="text-sm font-semibold">Soy Alternative</h1>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 flex items-center justify-center ">
                            <h1 className="text-sm text-gray-700 ml-2">$0.50</h1>
                        </div>

                        {/* Counter */}
                        <div className="col-span-3 flex items-center justify-end ">
                            <input
                                type="checkbox"
                                checked={soy}
                                onChange={handleSoy}
                                className="ml-2"
                            />
                        </div>
                    </div>
                    {!restrictionsMap[drink.restrictions]?.includes('IceNotAdjustable') && (
                  <p className='w-fit mx-auto  text-gray-700 text-xs pt-5'>
                    *Drinks made with Soy Milk cannot be done with No Ice or Hot.
                    </p>
            )}

            </div>

            

                {showAllToppings && (
                    <div>
                        {remainingToppings.map((topping,index) => (
                            <div key={topping.id}>
                                <Toppings
                                    name={topping.product_name}
                                    price={topping.product_price}
                                    onChange={(isAdding) => handleToppingChange(topping, isAdding,index)}
                                    disableIncrement={toppingCount >= 4}
                                    initialCount={getToppingCount(topping.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

            <div className='items-center text-center py-5'>

                { !showAllToppings && (
                    <CustomButton onClick={() => setShowAllToppings(true)}>
                        View More Toppings
                    </CustomButton>
                )}
                
            </div>

            
        </div>
    );
};
