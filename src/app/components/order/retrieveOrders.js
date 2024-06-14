// import { db } from "../_utils/firebase";
import { db } from "@/app/_utils/firebase";
import { query, deleteDoc, collection, getDocs, addDoc, doc } from "firebase/firestore";


export async function getOrders() {
  const ordersCollection = collection(db, 'orders'); // Reference to the orders subcollection under the user's document
  const ordersQuery = query(ordersCollection); // Create a query for the orders collection
  const querySnapshot = await getDocs(ordersQuery); // Execute the query and get a snapshot of the results
  // Convert the snapshot to an array of workout objects
  const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log(orders)
  return orders;
}