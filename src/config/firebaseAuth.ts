import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "./firebaseConfig";
import Swal from "sweetalert2";
import { AppUser } from "../classes/AppUser";

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

export async function signUpUserWithEmailAndPassword(
  username,
  email,
  password
) {
  try {
    const userCreds = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { user } = userCreds;

    await Swal.fire({
      title: "Success!",
      text: `Welcome ${username}`,
      icon: "success",
      confirmButtonText: "Cool",
    });

    await createUserDocumentFromAuth(user, username);

    window.location.href = "dashboard.html";
  } catch (err) {
    console.log(err);
  }
}

async function createUserDocumentFromAuth(userAuth, userName) {
  if (!userAuth) return;

  const userDocument = await getUserData(userAuth);

  if (!userDocument) {
    const { email, displayName, uid } = userAuth;

    const createdAt = new Date();

    const data = {
      id: uid,
      createdAt,
      email,
      name: userName,
    };

    // create a new class
    const newUser = new AppUser(data);

    // User object for firebase
    const userObject = {
      id: newUser.id,
      createdAt: newUser.createdAt,
      email: newUser.email,
      name: newUser.name,
      travel: newUser.travel,
      food: newUser.food,
      energy: newUser.energy,
      community: newUser.community,
    };

    try {
      const userDocRef = doc(firebaseDB, "users", userAuth.uid);
      await setDoc(userDocRef, userObject);
    } catch (err) {
      console.log(err);
    }
  }
}
