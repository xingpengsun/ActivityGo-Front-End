import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { AuthContext } from "../App";

const Nav = () => {
  const [click, setClick] = useState(false);
  // const [button, setButton] = useState(true);

  // const handleClick = () => setClick(!click);
  // const closeMoblieMenu = () => setClick(false);

  const showButton = () => {
    // if (window.innerWidth <= 960) {
    //   setButton(false);
    // } else {
    //   setButton(true);
    // }
  };

  const { authed, setAuthed } = useContext(AuthContext);

  window.addEventListener("resize", showButton);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              className="logo-nav"
              src={process.env.PUBLIC_URL + "logo-light.png"}
              alt="logo"
            />
            ACTIVITY GO
          </Link>
          <div className="menu-icon">
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={authed ? "/user/dashboard" : "/login"}
                className="nav-links"
              >
                {authed ? "Dashboard" : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
