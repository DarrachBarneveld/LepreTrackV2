import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FunctionComponent } from "react";
import { firebaseAuth } from "../config/firebaseConfig";
import Swal from "sweetalert2";
import "./NavButton.css";
import { signUpUserWithEmailAndPassword } from "../config/firebaseAuth";

interface NavButtonProps {
  auth: string;
}

const loginHtml = `
<input type="email" id="email" placeholder="Email" required />
<input type="password" id="password" placeholder="Password" required />
`;

const signupHtml = `
<input type="text" minlength="5" id="username" placeholder="Username" required />
<input type="email" id="email" placeholder="Email" required />
<input type="password" id="password" minlength="6" placeholder="Password" required  />
`;

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

async function signupForm() {
  Swal.fire({
    title: "Signup Form",
    icon: "question",
    html: signupHtml,
    confirmButtonText: "Sign Up",
    focusConfirm: false,
    preConfirm: () => {
      const usernameInput = Swal.getPopup()!.querySelector(
        "#username"
      ) as HTMLInputElement;
      const emailInput = Swal.getPopup()!.querySelector(
        "#email"
      ) as HTMLInputElement;
      const passwordInput = Swal.getPopup()!.querySelector(
        "#password"
      ) as HTMLInputElement;

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate the email using the regular expression
      if (!emailPattern.test(email)) {
        Swal.showValidationMessage("Please enter a valid email address.");
      }

      if (password.length < 6) {
        Swal.showValidationMessage(
          `Please enter a password of least 6 characters.`
        );
      }
      if (username.length < 5) {
        Swal.showValidationMessage(
          `Please enter a username of least 5 characters.`
        );
      }

      if (!password) {
        Swal.showValidationMessage(`Please enter a password`);
      }
      if (!email) {
        Swal.showValidationMessage(`Please enter an email`);
      }
      if (!username) {
        Swal.showValidationMessage(`Please enter a username`);
      }

      return {
        email,
        password,
        username,
      };
    },
  }).then(async (result) => {
    await signUpUserWithEmailAndPassword(
      result.value.username,
      result.value.email,
      result.value.password
    );
  });
}

async function loginForm() {
  Swal.fire({
    title: "Login",
    icon: "question",
    html: loginHtml,
    confirmButtonText: "Sign in",
    focusConfirm: false,
    preConfirm: () => {
      const email = Swal.getPopup()!.querySelector(
        "#email"
      ) as HTMLInputElement | null;
      const password = Swal.getPopup()!.querySelector(
        "#password"
      ) as HTMLInputElement | null;

      if (!email?.value || !password?.value) {
        Swal.showValidationMessage(`Please enter login and password`);
      }
      return { email: email?.value, password: password?.value };
    },
  }).then(async (result) => {
    await signInWithEmailAndPassword(
      firebaseAuth,
      result.value.email,
      result.value.password
    );

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    await Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });

    console.log("fire");
  });
}
const NavButton: FunctionComponent<NavButtonProps> = ({ auth }) => {
  const form =
    auth === "login" ? loginForm : auth === "signup" ? signupForm : logOutUser;

  return (
    <button
      onClick={form}
      className="nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3 w-100 text-capitalize"
    >
      {auth + " "}
      {auth === "login" && <i className="fa-solid fa-right-to-bracket"></i>}
      {auth === "signup" && <i className="fa-solid fa-user-plus"></i>}
      {auth === "logout" && <i className="fa-solid fa-right-to-bracket"></i>}
    </button>
  );
};

export default NavButton;
