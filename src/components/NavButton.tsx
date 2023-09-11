import { signInWithEmailAndPassword } from "firebase/auth";
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

async function signupForm() {
  Swal.fire({
    title: "Signup Form",
    icon: "question",
    html: signupHtml,
    confirmButtonText: "Sign Up",
    focusConfirm: false,
    didOpen: () => {
      const username = Swal.getPopup()!.querySelector(
        "#username"
      ) as HTMLInputElement;
      const email = Swal.getPopup()!.querySelector(
        "#email"
      ) as HTMLInputElement;
      const password = Swal.getPopup()!.querySelector(
        "#password"
      ) as HTMLInputElement;

      username.addEventListener("focus", () => {
        username.classList.add("focused");
      });
      email.addEventListener("focus", () => {
        email.classList.add("focused");
      });
      password.addEventListener("focus", () => {
        password.classList.add("focused");
      });
    },
    preConfirm: () => {
      const username = Swal.getPopup()!.querySelector(
        "#username"
      ) as HTMLInputElement | null;
      const email = Swal.getPopup()!.querySelector(
        "#email"
      ) as HTMLInputElement | null;
      const password = Swal.getPopup()!.querySelector(
        "#password"
      ) as HTMLInputElement | null;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate the email using the regular expression
      if (!emailPattern.test(email?.value.trim())) {
        Swal.showValidationMessage("Please enter a valid email address.");
      }

      if (password?.value.length < 6) {
        Swal.showValidationMessage(
          `Please enter a password of least 6 characters.`
        );
      }
      if (username?.value.length < 5) {
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
        email: email?.value.trim(),
        password: password,
        username: username?.value.trim(),
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
  const form = auth === "login" ? loginForm : signupForm;

  const text = auth === "login" ? "Login " : "Signup ";

  return (
    <button
      onClick={form}
      className="nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3 w-100"
    >
      {text}
      {auth === "login" && <i className="fa-solid fa-right-to-bracket"></i>}
      {auth === "signup" && <i className="fa-solid fa-user-plus"></i>}
    </button>
  );
};

export default NavButton;
