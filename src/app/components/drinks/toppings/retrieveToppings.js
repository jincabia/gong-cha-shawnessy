import { db } from "@/app/_utils/firebase";
import { query,deleteDoc,collection, getDocs, addDoc,doc } from "firebase/firestore";


export async function getToppings() {
  const toppingsCollection = collection(db, 'toppings'); // Reference to the toppings subcollection under the user's document
  const toppingsQuery = query(toppingsCollection); // Create a query for the toppings collection
  const querySnapshot = await getDocs(toppingsQuery); // Execute the query and get a snapshot of the results
  // Convert the snapshot to an array of workout objects
  const toppings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return toppings;
}

