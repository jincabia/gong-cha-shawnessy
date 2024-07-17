// src/components/updateUserCart.js
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/app/_utils/firebase';


const updateUserCart = async (userId, newItem) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      cart: arrayUnion(newItem) // Use arrayUnion to add newItem to the existing cart array
    });
    // console.log('Cart item added successfully');

    // Count the amt of times the drink was added


  } catch (e) {
    console.error('Error updating cart: ', e);
  }
};

export default updateUserCart;
