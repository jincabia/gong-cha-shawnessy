import { db } from '@/app/_utils/firebase'; // Adjust import path as per your project structure
import { doc, updateDoc,getDoc } from 'firebase/firestore';

async function updateCartQuantity(userId, cartIndex, newQuantity) {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            let cart = userDoc.data().cart;

            if (cart && cart.length > cartIndex) {
                // Update the quantity of the specific cart item
                cart[cartIndex].quantity = newQuantity;

                // Update the entire cart array in Firestore
                await updateDoc(userRef, {
                    cart: cart
                });

                console.log(`Quantity updated successfully for cart item at index ${cartIndex}`);
            } else {
                console.log(`No cart item found at index ${cartIndex} for user ${userId}`);
            }
        } else {
            console.log(`User document not found for user ${userId}`);
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error; // Optional: Propagate the error for handling in the component
    }
}

export default updateCartQuantity;
