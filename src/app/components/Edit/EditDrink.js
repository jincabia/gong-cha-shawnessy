'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef  } from 'react';
import { getToppings } from '../../components/drinks/toppings/retrieveToppings';
import Image from 'next/image';
import { getDrinkById } from '@/app/components/drinks/retrieveDrink';
import Toppings from '../topping/Topping';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import { useAuth } from '@/app/authContext/AuthContext';
import updateUserCart from '../updateUsersCollection/updateUsersCart';
import SignIn from '@/app/signin/page';
import AddToCartModal from '../ReadCart/AddToCart';


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



/*
PARAMETERS
ID - we'll use the id to query through the database and show the info

TODO 
- add to cart
- add to order
-error handling if they dont select an option
*/

const CustomizeDrink = () => {
  // When printing params, it only displays name for some reason?
  const params = useParams();
  const drinkID = params.id;

  // These 2 variables are used to read from the database
  const [drink, setDrink] = useState({});
  const [toppings, setToppings] = useState([]);

  // The variables will be changed based on user pref
  const [drinkToppings, setDrinkToppings] = useState([]);
  const [size, setSize] = useState("Select a Size");
  const [sugar, setSugar] = useState("Select a Sugar Level");
  const [ice, setIce] = useState("Select an Ice Level");

  // Price of the drink
  const [initialPrice, setInitialPrice] = useState(0);
  const [price, setPrice] = useState(0);

  // Num of toppings
  const [toppingCount, setToppingCount] = useState(0);

  // User 
  const {user} = useAuth();

  // User cart
  const [cart, setCart] = useState([])


  // Error Handling
  const [showError, setShowError] = useState(false); // State to show/hide error popup
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const errorRef = useRef(null); // Reference to the error message div


  // Success Msgs when drink is properly put into cart
  
  const [showSuccess, setShowSuccess] = useState(false); // State to show/hide success popup
  const successTimeout = useRef(null); // Reference to timeout for hiding success popup

  // const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [soy,setSoy] = useState(false)


  // Fetches Toppings from the database
  const fetchToppings = async () => {
    try {
      const toppingData = await getToppings();
      setToppings(toppingData);
      const hasSoy = toppingData.some(topping => topping.name === "Soy Milk Alternative");
      setSoy(hasSoy);
    } catch (error) {
      console.error(error);
    }
  };

  // This gets the drink by the Drink ID which is passed when clicked onto from menu
  const fetchDrink = async () => {
    try {
      const drinkData = await getDrinkById('drinks', drinkID);
      setDrink(drinkData);
      setInitialPrice(drinkData.product_price);
      setPrice(drinkData.product_price);
    } catch (error) {
      console.error('Error fetching drink:', error);
    }
  };

  const fetchCart = async () => 
    {
      if(!user) return null;

      try {
        // getDrinkByID works by having a collection then a certain id passed 
        // so we can use it here
        const cartData = await getDrinkById('users', user.uid);
        // cartData returns the UID, ID and email UID == ID they are the same
        setCart(cartData.cart)
      } catch (error) {
        console.error('Error fetching Cart:', error);

      }
    };

  useEffect(() => {
    fetchDrink();
    fetchToppings();
    fetchCart();
  }, []);

  // When a new Size is selected
  const handleSizeChange = (e) => {
    setSize(e.target.value);
        // handles changing the options but still keeps the price correct.

    if (e.target.value === "Large") {
      setPrice((prevPrice) => prevPrice + 0.5);
    } else if( e.target.value === "Medium" && size === "Large") {
      setPrice((prevPrice) => prevPrice - 0.5);

    }
  };

  // When a new Sugar is selected
  const handleSugarChange = (e) => {
    
    setSugar(e.target.value);
    // handles changing the options but still keeps the price correct.
    if (e.target.value === "130") {
      setPrice((prevPrice) => prevPrice + 0.5);
    }
    else if (e.target.value != "130" && sugar === "130" )
      {
        setPrice((prevPrice) => prevPrice - 0.5);
      }
  };

  // When a new Ice is selected
  const handleIceChange = (e) => {
    setIce(e.target.value);
    if (e.target.value === "Hot") {
      // If the selected ice is hot, enforce the size to be medium
      // handles changing the options but still keeps the price correct.

      if (size != 'Large') setPrice((prevPrice) => prevPrice + 0.5); // Adjust the price for hot drink
      setSize("Medium")
    }
    // So you cant just keep changing it back and forth
    else if (e.target.value != "Hot" && ice === 'Hot')
      {
        setPrice((prevPrice) => prevPrice - 0.5);
      }
  };



  // Handles the toppings addition, incrementing the counters, and adding to the array of toppings
  const handleToppingChange = (topping, isAdding) => {
    // While the num of toppings is less than 4
    if (isAdding && toppingCount < 4) {
      setDrinkToppings((prev) => [...prev, topping]);
      setPrice((prevPrice) => prevPrice + topping.product_price);
      setToppingCount((prevCount) => prevCount + 1);
    
    } 
    // When there is 4 toppings
    else if (!isAdding) {
      setDrinkToppings((prev) => prev.filter((t) => t.id !== topping.id));
      setPrice((prevPrice) => prevPrice - topping.product_price);
      setToppingCount((prevCount) => prevCount - 1);
    }
  };

  // TODO figure this shit out lol
  const handleToCart = () => {

    const restrictions = restrictionsMap[drink.restrictions];


    let missingField = "";
    console.log(drink.quantity)


    if (size === "Select a Size" && !restrictions.includes('MediumSizeOnly')) {
      missingField = "Size";
    } else if (sugar === "Select a Sugar Level" && !restrictions.includes('SugarNotAdjustable')) {
      missingField = "Sugar Level";
    } else if (ice === "Select an Ice Level" && !restrictions.includes('IceNotAdjustable')) {
      missingField = "Ice Level";
    }

    // If a field is missing, show error popup and scroll to the missing field
    if (missingField !== "") {
      setErrorMessage(`Please select a ${missingField}.`);
      setShowError(true);

      // Scroll to the missing field
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      return; // Exit function early if fields are not selected
    }

  
    
  // 0: [],
  // 1: ['MediumSizeOnly'],
  // 2: ['GreaterThanLessIce', 'NotAvailableHot'],
  // 3: ['GreaterThan0PercentSugar'],
  // 4: ['IceNotAdjustable', 'NotAvailableHot'],
  // 5: ['SugarNotAdjustable'],
  // 6: ['GreaterThanLessIce', 'NotAvailableHot', 'GreaterThan0PercentSugar'],
  // 7: ['MediumSizeOnly', 'IceNotAdjustable', 'NotAvailableHot', 'SugarNotAdjustable'],
  // 8: ['SugarNotAdjustable', 'GreaterThanLessIce', 'NotAvailableHot']

  // if(restrictionsMap[drink.restrictions]?.includes('SugarNotAdjustable'))
  //   {

  //   }
  // elif (restrictionsMap[drink.restrictions]?.includes('IceNotAdjustable'))
  // {

  // }
  // else 
  // {
  //   const customDrink = {
  //     drinkName: drink.product_name,
  //     restrictions: drink.restrictions,
  //     price: price,
  //     size: size,
  //     toppings: drinkToppings,
  //     sugar: sugar+'%',
  //     ice:ice,
  //     quantity:1
  //   }
  // }


      let customDrink;

    customDrink = {
      drinkName: drink.product_name,
      restrictions: drink.restrictions,
      price: price,
      size: size,
      toppings: drinkToppings,
      sugar: sugar + '%',
      ice: ice,
      quantity: drink.quantity,
      drinkID:drinkID
    };

    if(soy)
      {
  
        const soyTopping = {
          product_name:'Soy Milk Alternative',
          product_price:0.5,
          id:'GongChaShawnessy'
        }
  
  
        customDrink = {
          ...customDrink,
         toppings: [...drinkToppings,soyTopping],
         ice: 'Less Ice'
        };
      }


     if (restrictionsMap[drink.restrictions]?.includes('SugarNotAdjustable')) {
      customDrink = {
        ...customDrink,
        sugar: 'Sugar Not Adjustable'
      };
    } 
     if (restrictionsMap[drink.restrictions]?.includes('IceNotAdjustable')) {
      customDrink = {
        ...customDrink,
        ice: 'Ice Not Adjustable'
      };
    }

    

  updateUserCart(user.uid,customDrink);

  // Show success message and set timeout to hide it after 3 seconds
  setShowSuccess(true);
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
};

  useEffect(() => {
    return () => {
      // Clear timeout on component unmount to prevent memory leaks
      // clearTimeout(successTimeout.current);
    };
  }, []);


  const handleSoy = () =>
    {
      setSoy(!soy);

      if(soy) 
        {
          setPrice(price - 0.5)
          if(ice === 'Hot' || ice ==='No Ice')
            {
              setIce('Regular Ice')
            }
          

        }
      else
      {
        setPrice(price + 0.5)
      }
    }  

    const handleClose = () =>
      {
        setShowSuccess(false)
        router.push(`/menu/${drinkID}`)
  
      }
  

  return (
    <main className='text-black'>

      {!user && (
        <>

        <SignIn message={"Need to be logged in to Customize a Drink"}/>
        
        
        </>
      )}

      {user && (

        <div className='text-black'>

              
        {/* Success Popup */}

        {showSuccess && (
            <div>
              <AddToCartModal onClose={() => handleClose()} loading={loading} setLoading={setLoading} />
            </div>
          )}

        {/* Error Popup */}
        {showError && (
          <div ref={errorRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <p className="text-red-500 mb-2">{errorMessage}</p>
              <button onClick={() => setShowError(false)} className="block mx-auto bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700">Close</button>
            </div>
          </div>
        )}



        <div className='w-1/2 mx-auto sm:w-64 h-fit p-4 rounded-lg shadow-lg flex items-center justify-center text-center hover:drop-shadow-xl my-5'>
          {drink.product_name ? (
            <Image
              src={`/${drink.product_name}.png`}
              width={100}
              height={100}
              className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48"
              alt={drink.product_name}
            />
          ) : (
            <div className="spinner" style={{ width: 100, height: 100 }}></div>
          )}
        </div>

        {/* Drink Details */}
        <div className='flex justify-between mb-10 mx-5 border-b-2 border-black'>
          <h1>{drink.product_name}</h1>
          <h1 >${initialPrice.toFixed(2)}</h1>
        </div>

        {/* Render customization options here */}


        <div>
          {/* Restriction Numbers, to find out which options to render or not
          0 - No Restrictions
          1 - Medium Size Only (Frappes, Gingerbread Drink)
          2 - Greater than Less Ice and Are not available Hot (Lattes)
          3 - Greater than 0% Sugar (Brown Sugar, Honey, Wintermelon)
          4 - Ice Not adjustable and Are not available Hot (Smoothies)
          5 - Sugar Not Adjustable 
          6 - 2 + 3 (Dirty BS Latte)
          7 - 1 + 4 + 5 (Frappes)
          8 - 5 + 2 (Matcha Mango Pearl Tea, Strawberry Taro)

          Make more if needed 
          */}

          {/* Size Changes */}
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
              Size:
              <select 
                value={size} 
                onChange={handleSizeChange}
                className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >

                
              <option disabled > Select a Size</option>
                <option value="Medium" className="bg-white text-gray-900">Medium</option>
                {(!restrictionsMap[drink.restrictions]?.includes('MediumSizeOnly') && ice !== "hot") && (
                <option value="Large" className="bg-white text-gray-900">Large + $0.50</option>
                )}

              </select>
            </label>
          </div>


          

            {/* Sugar Changes */}
            {!restrictionsMap[drink.restrictions]?.includes('SugarNotAdjustable')  && (
              <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
                  Sugar Level:
                  <select 
                    value={sugar} 
                    onChange={handleSugarChange}
                    className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >

                          <option disabled > Select a Sugar Level</option>
                          <option value="100" className="bg-white text-gray-900">100% (Regular)</option>
                          <option value="70" className="bg-white text-gray-900">70%</option>
                          <option value="50" className="bg-white text-gray-900">50%</option>
                          <option value="30" className="bg-white text-gray-900">30%</option>
                          <option value="130" className="bg-white text-gray-900">130% + $.50</option>

                          {!restrictionsMap[drink.restrictions]?.includes('GreaterThan0PercentSugar')  && (
                          <option value="0" className="bg-white text-gray-900">0%</option>
                          )}
                          
                  </select>
                </label>
              </div>
              </>
            )}



            {/* Ice Changes */}

            {!restrictionsMap[drink.restrictions]?.includes('IceNotAdjustable') && (
                  <>

          <div>
            <label className="block text-gray-700 text-sm font-bold my-10 justify-center mx-5">
              Ice Level:
              <select 
                value={ice} 
                onChange={handleIceChange}
                className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >

                <option disabled>Select an Ice Level</option>
                {!restrictionsMap[drink.restrictions]?.includes('GreaterThanLessIce') && !soy && (
                    <option value="No ice" className="bg-white text-gray-900">No Ice</option>
                )}
                    <option value="Less ice" className="bg-white text-gray-900">Less Ice</option>
                    <option value="Regular ice" className="bg-white text-gray-900">Regular Ice</option>
                    <option value="Extra ice" className="bg-white text-gray-900">Extra Ice</option>

                {!restrictionsMap[drink.restrictions]?.includes('NotAvailableHot') && !soy && (
                <option value="Hot" className="bg-white text-gray-900">Hot + $.50 (Only Available In Medium Sizes) </option>
                )}
                
              </select>
            </label>
          </div>
                    
                  </>
                )}

                {!restrictionsMap[drink.restrictions]?.includes('NotAvailableHot') && (
                  <p className='w-fit mx-auto truncate text-gray-700 text-xs pb-10'>*Hot drinks are only available in Medium Sizes.</p>
                )}
          

        {/* End of Customization div */}
        </div>

        <div className='text-center'>
          <p className='text-sm text-gray-700 underline'>Max 4 Additional Toppings</p>
        </div>
        {/* When adding toppings only have 4 max */}
        {/* Display all toppings from DB */}
        {toppings.map((topping) => (
          <div key={topping.id}>
            <Toppings
              name={topping.product_name}
              price={topping.product_price}
              onChange={(isAdding) => handleToppingChange(topping, isAdding)}
              disableIncrement={toppingCount >= 4}
            />
          </div>
        ))}

        <h1>Hi</h1>

        <div className="topping-item border-b border-black py-8 w-4/5 mx-auto ">
            <div className="container mx-auto grid grid-cols-8 gap-5 items-center ">
                  
                    {/* Name */}
                    <div className="col-span-2 flex items-center justify-start ">
                      <h1 className="text-sm font-semibold">Soy Alternative</h1>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 flex items-center justify-center ">
                      <h1 className="text-sm text-gray-700 ml-2">$.50</h1>
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
          </div>

        {/* Display the final Price after adjustments */}
        <div className='flex justify-around items-center my-10 mx-auto '>
          <h1 className='underline'>Final Price: ${price.toFixed(2)}</h1>
          <button 
            onClick={handleToCart} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
          
        </div>
        </div>

      )}




    </main>
    
    
  );
};

export default CustomizeDrink;
