import { FC } from "react";
import logo from "../assets/images/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-nav">
        <div className="container-fluid">
          <div className="logo">
            <a className="navbar-brand" href="index.html">
              <img className="img-fluid" src={logo} alt="logo" />
            </a>
          </div>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse fs-4" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbar-list">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                      : isActive
                      ? "nav-link btn btn-primary text-white m-1 ms-0 mx-2 px-3"
                      : "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                  }
                >
                  Home <i className="fa-solid fa-house"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/learn"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                      : isActive
                      ? "nav-link btn btn-primary text-white m-1 ms-0 mx-2 px-3"
                      : "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                  }
                >
                  Learn <i className="fa-solid fa-house fa-book-open"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                      : isActive
                      ? "nav-link btn btn-primary text-white m-1 ms-0 mx-2 px-3"
                      : "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                  }
                >
                  About Us
                  <i className="fa-solid fa-people-group"></i>
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <NavButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
