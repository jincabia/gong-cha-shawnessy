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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';
import ImageComponent from '../image/ImageComponent';
import { SizeSelector } from './selectors/SizeSelector';
import { SugarSelector } from './selectors/SugarSelector';
import { IceSelector } from './selectors/IceSelector';
import { ToppingsList } from './toppings/ToppingsList';

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
 Add to cart
  - Add an ID when writing to db so we can delete items properly 
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
  const [price, setPrice] = useState(0);

  // Num of toppings
  const [toppingCount, setToppingCount] = useState(0);

  // User 
  const {user} = useAuth();
  // Router to change url
  const router = useRouter();


  // Error Handling
  const [showError, setShowError] = useState(false); // State to show/hide error popup
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const errorRef = useRef(null); // Reference to the error message div


  // Success Msgs when drink is properly put into cart
  
  const [showSuccess, setShowSuccess] = useState(false); // State to show/hide success popup
  const successTimeout = useRef(null); // Reference to timeout for hiding success popup

  // const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [soy,setSoy] = useState(false);

  // Fetches Toppings from the database
  const fetchToppings = async () => {
    try {
      const toppingData = await getToppings();
      setToppings(toppingData);
    } catch (error) {
      console.error(error);
    }
  };

  // This gets the drink by the Drink ID which is passed when clicked onto from menu
  const fetchDrink = async () => {
    try {
      const drinkData = await getDrinkById('drinks', drinkID);
      setDrink(drinkData);
      setPrice(drinkData.product_price);

      if (drinkData.restrictions === "4") {
        setSize("Medium");
      }
    } catch (error) {
      console.error('Error fetching drink:', error);
    }
  };

 

  useEffect(() => {
    fetchDrink();
    fetchToppings();
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
  const handleToppingChange = (topping, isAdding, index) => {
    if (isAdding && toppingCount < 4) {
        setDrinkToppings((prev) => [...prev, topping]);
        setPrice((prevPrice) => prevPrice + topping.product_price);
        setToppingCount((prevCount) => prevCount + 1);
    } else if (!isAdding) {
        setDrinkToppings((prev) => {
            const newToppings = [...prev];
            newToppings.splice(index, 1);
            return newToppings;
        });
        setPrice((prevPrice) => prevPrice - topping.product_price);
        setToppingCount((prevCount) => prevCount - 1);
    }
  };


  // TODO figure this shit out lol
  const handleToCart = () => {

    const restrictions = restrictionsMap[drink.restrictions];


    let missingField = "";


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

      let customDrink;


      if (soy && (ice === "Hot" || ice === "No Ice")) {
        setErrorMessage("Soy Alternative is not available with Hot or No Ice options.");
        setShowError(true);
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    
    

    customDrink = {
      drinkName: drink.product_name,
      restrictions: drink.restrictions,
      price: price,
      size: size,
      toppings: drinkToppings,
      sugar: sugar + '%',
      ice: ice,
      quantity: 1,
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
         ice: ice
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

    if (restrictionsMap[drink.restrictions]?.includes('MediumSizeOnly')) {
      customDrink = {
        ...customDrink,
        size: 'Medium'
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

  

  const handleClose = () =>
    {
      setShowSuccess(false)
      router.push(`/menu/${drinkID}`)

    }


   

  const handleSoy = () => {
    setSoy(!soy);
    // console.log(soy)
    
    if (soy) {
      setPrice((curr) => curr-.5);
    } else {
      setPrice((curr) => curr+.5);
    }
    if (!soy && (ice === 'Hot' )) {
      setIce('Select an Ice Level');
      setPrice((curr) => curr -.5);
      setErrorMessage("Soy Alternative is not available with Hot or No Ice options.");
        setShowError(true);
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    if (!soy && (ice === 'No ice' )) {
      setIce('Select an Ice Level');
      setErrorMessage("Soy Alternative is not available with Hot or No Ice options.");
        setShowError(true);
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

  };


  

  return (
    <main className='text-black'>
      {/* <button onClick={()=>console.log(drink)}>Click meeeee</button> */}
       <button onClick={()=> router.back()} className='m-2'>
            <ChevronLeftIcon fontSize='large'/>
         </button>

      {!user && (
        <>

        <SignIn />
        
        
        </>
      )}

      {user && (

        <div className='text-black md:w-1/3  mx-auto h-max'>

              
        {/* Success Popup */}

        {showSuccess && (
            <div>
              <AddToCartModal onClose={() => handleClose()} loading={loading} setLoading={setLoading} />
            </div>
          )}

        {/* Error Popup */}
        {showError && (
          <div ref={errorRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center w-3/4">
              <p className="text-red-500 mb-2">{errorMessage}</p>
              <button onClick={() => setShowError(false)} className="block mx-auto bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700">Close</button>
            </div>
          </div>
        )}



        {/* If there is a product name ie Milk Tea with Pearls load ImageComponent instead of having undefined.png */}
        <div className='w-1/2 mx-auto  h-fit p-4 rounded-lg shadow-lg flex items-center justify-center text-center my-5'>
          
          {drink.product_name && 
          
          <ImageComponent imagePath={`${drink.product_name}.png`}/>
          }

          {!drink.product_name &&
          <div className='spinner'></div>
          }
        </div>

        {/* Drink Details */}
        <div className='flex justify-between mb-10 mx-5 border-b-2 border-black'>
          <h1>{drink.product_name}</h1>
        </div>


          {/* Drink Selectors */}
        <div>
          

          {/* Size Changes */}
          <SizeSelector drink={drink} size={size} handleSizeChange={handleSizeChange}  ice={ice}/>

          {/* Sugar Changes */}
          <SugarSelector drink={drink} sugar={sugar} handleSugarChange={handleSugarChange}/>
            

          {/* Ice Changes */}
          <IceSelector drink={drink} ice={ice} soy={soy} handleIceChange={handleIceChange}/>
            

        {/* End of Customization div */}
        </div>

        <div className='text-center'>
          <p className='text-sm text-gray-700 underline'>Max 4 Additional Toppings</p>
        </div>
        {/* When adding toppings only have 4 max */}
        {/* Display all toppings from DB */}

        <ToppingsList handleToppingChange={handleToppingChange} toppingCount={toppingCount} 
        drink={drink} soy={soy} handleSoy={handleSoy}/>

      
        {/* Display the final Price after adjustments */}
        <div className='flex justify-around items-center my-10 mx-auto '>
          <h1 className='underline'>${price.toFixed(2)}</h1>
          <button 
            onClick={handleToCart} 
            className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md"
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
