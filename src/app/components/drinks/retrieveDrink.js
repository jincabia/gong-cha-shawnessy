// import { db } from "../_utils/firebase";
import { db } from "@/app/_utils/firebase";
import { query,deleteDoc,collection, getDocs, addDoc,doc,where, getDoc,setDoc,increment,updateDoc  } from "firebase/firestore";



// Used to read from the collection drinks
export async function getDrinks() {
  const drinksCollection = collection(db, 'drinks'); // Reference to the drinks subcollection under the user's document
  const drinksQuery = query(drinksCollection); // Create a query for the drinks collection
  const querySnapshot = await getDocs(drinksQuery); // Execute the query and get a snapshot of the results
  // Convert the snapshot to an array of workout objects
  const drinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log(drinks)


  return drinks;

}

export async function getCartData()
{
  const cartDataCollection = collection(db,'cartData');
  const cartDataQuery = query(cartDataCollection);
  const querySnapshot = await getDocs(cartDataQuery);

  const cartData = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));

  return cartData;

}

export async function addDrinksToCartData() {
  const drinks = await getDrinks(); // Get all drinks
  const cartDataCollection = collection(db, 'cartData'); // Reference to the cartData collection

  // Use Promise.all to ensure all setDoc operations are completed
  await Promise.all(drinks.map(async (drink, index) => {
    // Create a new document in the cartData collection with id, name, and a counter
    await setDoc(doc(cartDataCollection, drink.id), {
      id: drink.id,
      name: drink.product_name,
      counter: 0 // Adding a counter starting from 1
    });
  }));
}



//Used to load the dynamic page, search for a drink using the document id
export const getDrinkById = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null; // Document does not exist
  }
};

//Used to load the dynamic page, search for a drink using the document id
// docId is the drinks.id 
export const updateCartData = async (docId) => {
  const docRef = doc(db, 'cartData', docId); // Reference to the specific document in cartData collection
  const docSnap = await getDoc(docRef); // Fetch the document snapshot

  if (docSnap.exists()) {
    // Increment the counter by 1
    await updateDoc(docRef, {
      counter: increment(1)
    });

    // Return the updated document
    const updatedDocSnap = await getDoc(docRef);
    return { id: updatedDocSnap.id, ...updatedDocSnap.data() };
  } else {
    return null; // Document does not exist
  }
};

export const getUserCartByID = async (collectionName, docId) => {

  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null; // Document does not exist
  }

};
