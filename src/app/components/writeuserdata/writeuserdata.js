
import { db } from "@/app/_utils/firebase";

export const writeUserData = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      cart: []
    });
    console.log('User data written to Firestore:', user);
  } else {
    console.log('User already exists in Firestore:', user);
  }
};
