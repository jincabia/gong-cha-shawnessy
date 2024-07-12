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
   import ImageComponent from '@/app/components/image/ImageComponent';
   import { IceSelector } from '@/app/components/drinks/selectors/IceSelector';
   import { SizeSelector } from '@/app/components/drinks/selectors/SizeSelector';
   import { SugarSelector } from '@/app/components/drinks/selectors/SugarSelector';
   import { ToppingsList } from '@/app/components/drinks/toppings/ToppingsList';
   import { QuantityCounter } from '@/app/components/drinks/quantityCounter';

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
   const [quantity,setQuantity] = useState(1)

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
               setQuantity(cartItemData.quantity)
               setSize(cartItemData.size);
               setIce(cartItemData.ice);
               setPrice(cartItemData.price);
               setSugar(cartItemData.sugar.slice(0,-1));
               setDrinkToppings(cartItemData.toppings)
               console.log('this is the cartItem toppings', drinkToppings)
               
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



// Inside the handleSaveChanges function
const handleSaveChanges = async () => {

   let missingField = "";


   if (size === "Select a Size" && !drink.restrictions.includes('MediumSizeOnly')) {
     missingField = "Size";
   } else if (sugar === "Select a Sugar Level" && !drink.restrictions.includes('SugarNotAdjustable')) {
     missingField = "Sugar Level";
   } else if (ice === "Select an Ice Level" && !drink.restrictions.includes('IceNotAdjustable')) {
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


   let customDrink = {
       drinkName: drink.drinkName,
       restrictions: drink.restrictions,
       price: price,
       size: size,
       toppings: soy ? drinkToppings : drinkToppings.filter(topping => topping.product_name !== "Soy Milk Alternative"),
       sugar: sugar + '%',
       ice: ice,
       quantity: quantity,
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
         // ice: 'Less Ice'
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

   // console.log(customDrink);

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
       router.push(`/menu/${drink.drinkID}`)
 
     }


   return (

      <div className='text-black lg:w-1/3 mx-auto'>
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
            

            {drink.drinkName && (

            <ImageComponent imagePath={`${drink.drinkName}.png`}/>
            )}

            {!drink.drinkName &&
               <div className='spinner'></div>
            }

         </div>

         {/* Drink Details */}
         <div className='flex justify-between mb-10 mx-5 border-b-2 border-black'>
            <h1>{drink.drinkName}</h1>
         </div>

         {/* Render customization options here */}


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
        
         <ToppingsList handleToppingChange={handleToppingChange} 
         toppingCount={toppingCount} drink={drink} soy={soy} handleSoy={handleSoy}
         />

         <div>
            <QuantityCounter quantity={quantity} setQuantity={setQuantity}/>
          </div>

          <button 
        onClick={()=>handleSaveChanges()} 
        className='flex justify-around items-center mb-10 mt-2 text-center 
        bg-red-800
      text-white rounded-md  w-3/4 mx-auto 
      shadow-md'>
          <button 
            onClick={()=>handleSaveChanges()} 
            className="bg-red-800 rounded-md py-2 px-4  "
          >
            Add to Cart 
          </button>
          <p>-</p>
          <h1 className='py-2 px-4 font-semibold '>${(price.toFixed(2)* quantity).toFixed(2)}</h1>
          
          </button>




         {/* Display the final Price after adjustments
         <div className='flex justify-around items-center my-10 mx-auto '>
            <h1 className='underline'>${price.toFixed(2)}</h1>
            <button 
               onClick={()=>handleSaveChanges()} 
               className="bg-red-800 rounded-md py-2 px-4 text-white shadow-md"
            >
               Save Changes
            </button>
            
         </div> */}

         <p>{error}</p>
         </div>

         
   );
   }
