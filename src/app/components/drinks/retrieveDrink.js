// import { db } from "../_utils/firebase";
import { db } from "@/app/_utils/firebase";
import { query,deleteDoc,collection, getDocs, addDoc,doc,where, getDoc } from "firebase/firestore";



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
