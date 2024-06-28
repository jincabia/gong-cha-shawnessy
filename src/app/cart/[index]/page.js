   'use client';
   import { useState, useEffect,useRef } from 'react';
   import { useParams } from 'next/navigation';
   import { doc, getDoc } from 'firebase/firestore';
   import { db } from '@/app/_utils/firebase';
   import { useAuth } from '@/app/authContext/AuthContext';
   import { getToppings } from '@/app/components/drinks/toppings/retrieveToppings';
   import Toppings from '@/app/components/topping/Topping';
   import Image from 'next/image';
   import { getDrinkById } from '@/app/components/drinks/retrieveDrink';
   import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
   import { useRouter } from 'next/navigation';
   import { updateDoc } from "firebase/firestore";
   import EditCartModal from '@/app/components/ReadCart/EditCart';
   
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
   

   export default function EditPage() {
   const params = useParams();
   const cartIndex = params.index;
   const {user} = useAuth();

   const router = useRouter();

   const [error, setError] = useState(null);

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

   // User cart
   const [cart, setCart] = useState([])


   // Error Handling
   const [showError, setShowError] = useState(false); // State to show/hide error popup
   const [errorMessage, setErrorMessage] = useState(""); // State to store error message
   const errorRef = useRef(null); // Reference to the error message div


   // Success Msgs when drink is properly put into cart
   
   const [showSuccess, setShowSuccess] = useState(false); // State to show/hide success popup
   // const successTimeout = useRef(null); // Reference to timeout for hiding success popup

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

      useEffect(() => {
         const fetchCartItem = async () => {
         if (!user || !user.uid) {
            setError('User is not authenticated');
            setLoading(false);
            return;
         }
   
         try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);
   
            if (userDocSnap.exists()) {
               const userData = userDocSnap.data();
               const cartItemData = userData.cart[cartIndex];
               
               if (!cartItemData) {
               setError('Cart item not found');
               setLoading(false);
               return;
               }
   
               setDrink(cartItemData);
               setSize(cartItemData.size);
               setIce(cartItemData.ice);
               setPrice(cartItemData.price);
               setSugar(cartItemData.sugar.slice(0,-1));
               setDrinkToppings(cartItemData.toppings)
               
               const hasSoy = cartItemData.toppings.some(topping => topping.product_name === "Soy Milk Alternative");
               // console.log(hasSoy,'this is soy')
               setSoy(hasSoy);
               
               setToppingCount((cartItemData.toppings.length));
               if(hasSoy)
                  {
                     setToppingCount(cartItemData.toppings.length -1);
                     
                  }
                  
                  console.log('cart toppings length is ',cartItemData.toppings.length)
               // console.log(toppingCount,'this is the topping count')
      
            } else {
               console.error('No such user document!');
               setError('No user data found');
            }
         } catch (err) {
            console.error('Error fetching document:', err);
            setError('Error fetching data');
         } finally {
            setLoading(false);
         }
         };
   
         fetchCartItem();
         fetchToppings();

      }, [cartIndex, user]);



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



// Inside the handleSaveChanges function
const handleSaveChanges = async () => {
   let customDrink = {
       drinkName: drink.drinkName,
       restrictions: drink.restrictions,
       price: price,
       size: size,
       toppings: soy ? drinkToppings : drinkToppings.filter(topping => topping.product_name !== "Soy Milk Alternative"),       sugar: sugar + '%',
       ice: ice,
       quantity: 1,
       drinkID: drink.drinkID
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

   console.log(customDrink);

   // If soy is false and inside drinkToppings has Soy Milk Alternative filter soy milk alternative

   try {
       if (!user || !user.uid) {
           setError('User is not authenticated');
           return;
       }

       const userDocRef = doc(db, 'users', user.uid);
       const userDocSnap = await getDoc(userDocRef);

       if (userDocSnap.exists()) {
           const userData = userDocSnap.data();
           const updatedCart = [...userData.cart];

           // Remove the old item at the specified index
           updatedCart.splice(cartIndex, 1, customDrink);

           await updateDoc(userDocRef, { cart: updatedCart });

           setShowSuccess(true);  // Show success message
         //   successTimeout.current = setTimeout(() => setShowSuccess(false), 3000);  // Hide success message after 3 seconds

           console.log('Cart updated successfully');
       } else {
           console.error('No such user document!');
           setError('No user data found');
       }
   } catch (err) {
       console.error('Error updating document:', err);
       setError('Error updating data');
   }

   setShowSuccess(true);
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
  setShowSuccess(true);


};

const handleSoy = () => {
   setSoy(!soy);
   console.log(soy)
   
   if (soy) {
     setPrice((curr) => curr-.5);
   } else {
     setPrice((curr) => curr+.5);
   }
   if (!soy && (ice === 'Hot' )) {
     setIce('Select an Ice Level');
     setPrice((curr) => curr -.5);
     console.log('fart')
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

   const handleClose = () =>
     {
       setShowSuccess(false)
       router.push(`/menu/${drinkID}`)
 
     }


   return (

      <div className='text-black'>
         {/* <button onClick={()=> console.log(drink)}>Clickme</button> */}
         <button onClick={()=> router.back()} className='m-2'>
            <ChevronLeftIcon fontSize='large'/>

         </button>

         {showSuccess && (
            <div>
              <EditCartModal onClose={() => handleClose()} loading={loading} setLoading={setLoading} />
            </div>
          )}

      {showError && (
          <div ref={errorRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center w-3/4">
              <p className="text-red-500 mb-2">{errorMessage}</p>
              <button onClick={() => setShowError(false)} className="block mx-auto bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700">Close</button>
            </div>
          </div>
        )}

         <div className='w-1/2 mx-auto sm:w-64 h-fit p-4 rounded-lg shadow-lg flex items-center justify-center text-center hover:drop-shadow-xl my-5'>
            {drink.drinkName ? (
               <Image
               src={`/${drink.drinkName}.png`}
               width={100}
               height={100}
               className="sm:w-28 sm:h-38 md:w-32 md:h-48 lg:w-30 lg:h-48"
               alt={drink.drinkName}
               priority
               />
            ) : (
               <div className="spinner" style={{ width: 100, height: 100 }}></div>
            )}
         </div>

         {/* Drink Details */}
         <div className='flex justify-between mb-10 mx-5 border-b-2 border-black'>
            <h1>{drink.drinkName}</h1>
         </div>

         {/* Render customization options here */}


         <div>
            

            {/* Size Changes */}
            
            <div>
               <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
               <div className='flex'>
              <p className='text-red-500'>*</p>
              Size: 

              </div>
               <select 
                  value={size} 
                  onChange={handleSizeChange}
                  className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               >

                  
               <option disabled > Select a Size</option>
                  <option value="Medium" className="bg-white text-gray-900">Medium</option>
                  {(!restrictionsMap[drink.restrictions]?.includes('MediumSizeOnly') && ice !== "Hot") && (
                  <option value="Large" className="bg-white text-gray-900">Large + $0.50</option>
                  )}

               </select>
               </label>
            </div>


            

               {/* Sugar Changes */}
               {!restrictionsMap[drink.restrictions]?.includes('SugarNotAdjustable') && (
               <>
               <div>
                  <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
                     <div className='flex'>
              <p className='text-red-500'>*</p>
              Sugar Level: 

              </div>
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
                  <div className='flex'>
              <p className='text-red-500'>*</p>
              Ice Level: 

              </div>
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

                  {!restrictionsMap[drink.restrictions]?.includes('NotAvailableHot') &&!soy && (
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
         {/* {toppings.map((topping) => (
            <div key={topping.id}>
               <Toppings
               name={topping.product_name}
               price={topping.product_price}
               onChange={(isAdding) => handleToppingChange(topping, isAdding)}
               disableIncrement={toppingCount >= 4}
               />
            </div>
         ))} */}
         {toppings.map((topping) => {
               const initialToppingCount = drinkToppings.filter(t => t.id === topping.id).length;
               return (
               <Toppings
                  key={topping.id}
                  name={topping.product_name}
                  price={topping.product_price}
                  initialCount={initialToppingCount}
                  onChange={(isAdding) => handleToppingChange(topping, isAdding)}
                  disableIncrement={toppingCount >=4}
               />
               );
            })}

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
               </div>

         {/* Display the final Price after adjustments */}
         <div className='flex justify-around items-center my-10 mx-auto '>
            <h1 className='underline'>${price.toFixed(2)}</h1>
            <button 
               onClick={()=>handleSaveChanges()} 
               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
               Save Changes
            </button>
            
         </div>
         </div>

         
   );
   }
