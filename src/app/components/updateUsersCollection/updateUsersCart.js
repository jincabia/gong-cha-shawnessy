// src/components/updateUserOrders.js
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/app/_utils/firebase';


const updateUserCart = async (userId, newOrder) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        // Adds a value to the array/ appends 
      cart: arrayUnion(newOrder),
    });
    console.log('Order added successfully');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export default updateUserOrders;
