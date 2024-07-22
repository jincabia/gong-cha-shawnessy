
import { db } from "@/app/_utils/firebase";
import { query,deleteDoc,collection, getDocs, addDoc,doc,where, getDoc,setDoc,increment,updateDoc  } from "firebase/firestore";


export const ReadCategory = async () =>
{
  const categoriesCollection = collection(db, 'categories'); // Reference to the categories subcollection under the user's document
  const categoriesQuery = query(categoriesCollection); // Create a query for the categories collection
  const querySnapshot = await getDocs(categoriesQuery); // Execute the query and get a snapshot of the results
  // Convert the snapshot to an array of workout objects
  const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log(categories)

  return categories

}