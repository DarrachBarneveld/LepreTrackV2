import { signInWithEmailAndPassword } from "firebase/auth";
import { FunctionComponent } from "react";
import { firebaseAuth } from "../config/firebaseConfig";
import Swal from "sweetalert2";

interface NavButtonProps {}

const loginHtml = `
<input type="email" class="swal2-input" id="email" placeholder="Email" required />
<input type="password" id="password" class="swal2-input" placeholder="Password" required />
`;

const NavButton: FunctionComponent<NavButtonProps> = () => {
  async function loginForm() {
    Swal.fire({
      title: "Login Form",
      icon: "question",
      html: loginHtml,
      confirmButtonText: "Sign in",
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup()!.querySelector("#email")!.value;
        const password = Swal.getPopup()!.querySelector("#password")!.value;
        if (!email || !password) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return { email: email, password: password };
      },
    }).then(async (result) => {
      await signInWithEmailAndPassword(
        firebaseAuth,
        result.value.email,
        result.value.password
      );
    });
  }

  return (
    <button
      onClick={loginForm}
      className="nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
    >
      Login <i className="fa-solid fa-right-to-bracket"></i>
    </button>
  );
};

export default NavButton;
