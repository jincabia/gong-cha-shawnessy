import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

async function removeDrinkFromCartInFirebase(userId, index) {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);  // Corrected to use getDoc

  if (userDocSnap.exists()) {
    const userCart = userDocSnap.data().cart;

    // Remove the drink at the specified index
    const updatedCart = userCart.filter((_, i) => i !== index);

    await updateDoc(userDocRef, {
      cart: updatedCart
    });
  } else {
    throw new Error("User document does not exist");
  }
}
export default removeDrinkFromCartInFirebase