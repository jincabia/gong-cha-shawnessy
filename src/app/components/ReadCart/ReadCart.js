// src/components/readUserCart.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/_utils/firebase';

const readUserCart = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.cart || []; // Return the cart or an empty array if it doesn't exist
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (e) {
    console.error('Error reading cart: ', e);
    return [];
  }
};

export default readUserCart;
