// import { db } from "../_utils/firebase";
import { db } from "@/app/_utils/firebase";
import { query,deleteDoc,collection, getDocs, addDoc,doc } from "firebase/firestore";


export async function getDrinks() {
  const drinksCollection = collection(db, 'drinks'); // Reference to the drinks subcollection under the user's document
  const drinksQuery = query(drinksCollection); // Create a query for the drinks collection
  const querySnapshot = await getDocs(drinksQuery); // Execute the query and get a snapshot of the results
  // Convert the snapshot to an array of workout objects
  const drinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log(drinks)
  return drinks;
}