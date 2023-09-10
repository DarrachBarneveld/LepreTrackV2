import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "./firebaseConfig";

export async function getUserData(user: User) {
  try {
    const userRef = doc(firebaseDB, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error retrieving user data:", error);
  }
}
