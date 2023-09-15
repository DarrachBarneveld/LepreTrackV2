import { FC } from "react";
import logo from "../assets/images/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import NavButton from "./NavButton";
import { AppUser } from "../classes/AppUser";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavBarProps {
  user: AppUser | undefined;
}

const NavBar: FC<NavBarProps> = ({ user }) => {
  return (
    <header>
      <Navbar expand="lg" className="navbar-light fixed-top px-2">
        <Navbar.Brand href="#">
          <div className="logo">
            <img className="img-fluid" src={logo} alt="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-1 my-2 my-lg-0">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
                  : isActive
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-primary text-white"
                  : "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
              }
            >
              Home <i className="fa-solid fa-house"></i>
            </NavLink>
            {user && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="nav-link btn btn-success text-white w-100"
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
            <NavLink
              to="/learn"
              className={({ isActive, isPending }) =>
                isPending
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
                  : isActive
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-primary text-white"
                  : "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
              }
            >
              Learn <i className="fa-solid fa-house fa-book-open"></i>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isPending
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
                  : isActive
                  ? "d-flex justify-content-center align-items-center nav-link btn btn-primary text-white"
                  : "d-flex justify-content-center align-items-center nav-link btn btn-success text-white"
              }
            >
              About <i className="fa-solid fa-people-group"></i>
            </NavLink>
          </Nav>

          {user ? (
            <div className="d-flex gap-1">
              <NavLink
                to="/dashboard"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "d-flex justify-content-center align-items-center nav-link btn btn-success text-white w-100"
                    : isActive
                    ? "d-flex justify-content-center align-items-center nav-link btn btn-primary text-white w-100"
                    : "d-flex justify-content-center align-items-center nav-link btn btn-success text-white w-100"
                }
              >
                {user.name} <i className="fa-solid fa-user"></i>
              </NavLink>
              <NavButton auth="logout" />
            </div>
          ) : (
            <div className="d-flex gap-1">
              <NavButton auth="signup" />
              <NavButton auth="login" />
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavBar;
