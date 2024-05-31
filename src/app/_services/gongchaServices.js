// firestoreQueries.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../_utils/firebase';

export const fetchDrinks = async () => {
  const DrinksCollection = collection(db, 'drinks');
  const DrinksSnapshot = await getDocs(DrinksCollection);
  const DrinksList = DrinksSnapshot.docs.map(doc => doc.data());
  console.log(DrinksList)
  return DrinksList;
};
