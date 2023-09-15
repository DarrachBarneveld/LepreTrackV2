import { FC } from "react";
import logo from "../assets/images/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import { AppUser } from "../classes/AppUser";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavBarProps {
  user: AppUser | undefined;
}

const NavBar: FC<NavBarProps> = ({ user }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
            <span className="navbar-toggler-icon text-dark"></span>
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

              {user && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3"
                  >
                    Categories
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item as={Link} to={"dashboard"}>
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"travel"}>
                      Travel
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"food"}>
                      Food
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"energy"}>
                      Energy
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"community"}>
                      Community
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
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
                  About <i className="fa-solid fa-people-group"></i>
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              {user ? (
                <ul className="navbar-nav" id="navbar-list">
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3 text-capitalize"
                          : isActive
                          ? "nav-link btn btn-primary text-white m-1 ms-0 mx-2 px-3 text-capitalize"
                          : "nav-link btn btn-success text-white m-1 ms-0 mx-2 px-3 text-capitalize"
                      }
                    >
                      {user.name} <i className="fa-solid fa-user"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavButton auth="logout" />
                  </li>
                </ul>
              ) : (
                <>
                  <NavButton auth="signup" />
                  <NavButton auth="login" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
