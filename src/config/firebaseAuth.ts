import { User, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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
  username: string,
  email: string,
  password: string
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

export async function logOutUser() {
  const result = await Swal.fire({
    title: "Are you sure you want to log out?",
    text: "You will be logged out from your account.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log me out",
  });

  if (result.isConfirmed) {
    await signOut(firebaseAuth);

    window.location.href = "/";
  }
}

async function createUserDocumentFromAuth(userAuth: User, userName: string) {
  if (!userAuth) return;

  const userDocument = await getUserData(userAuth);

  if (!userDocument) {
    const { email, displayName, uid } = userAuth;

    const createdAt = new Date();

    if (!email) return;

    const data = {
      id: uid,
      createdAt,
      email,
      name: userName,
    };

    // create a new class
    const newUser = new AppUser(data);
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

    // User object for firebase

    try {
      const userDocRef = doc(firebaseDB, "users", userAuth.uid);
      await setDoc(userDocRef, userObject);
    } catch (err) {
      console.log(err);
    }
  }
}
