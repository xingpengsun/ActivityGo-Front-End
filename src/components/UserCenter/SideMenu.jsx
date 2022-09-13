import { useContext, useEffect, useState } from "react";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../App";
import { USER_CENTER_SIDEMENU_NAV } from "../../config/user";
import { TOKEN_STORAGE_NAME } from "../../config";
import "./SideMenu.css";

const { confirm } = Modal;

const SignOut = <FontAwesomeIcon icon={faSignOutAlt} />;

const SideMenu = () => {
  const { authed, setAuthed } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();
  const history = useHistory();

  function showConfirm() {
    confirm({
      title: "Do you Want to log out?",
      icon: <ExclamationCircleOutlined />,
      content: "Your credentials will be safely deleted.",
      onOk() {
        localStorage.removeItem(TOKEN_STORAGE_NAME);
        setAuthed(false);
        history.push("/");
      },
      onCancel() {},
    });
  }

  useEffect(() => {
    const pathname = location.pathname;
    setActiveItem(pathname);
  }, [location.pathname]);

  return (
    <div className="user-center_side-menu">
      <div className="user-center_side-menu-title">User Center</div>
      <div className="user-center_side-menu_nav">
        <Link className="user-center_side-menu_nav-item" key={-1} to={"/"}>
          Back to Home
        </Link>
        {USER_CENTER_SIDEMENU_NAV.map((item, index) => {
          return (
            <Link
              className={`user-center_side-menu_nav-item ${
                activeItem === item.route &&
                "user-center_side-menu_nav-item-active"
              }`}
              key={index}
              to={item.route}
            >
              <span className="user-center_side-menu_nav-item-icon">
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
        <nav
          className="user-center_side-menu_nav-item"
          key={-2}
          onClick={() => showConfirm()}
        >
          <span className="user-center_side-menu_nav-item-icon">{SignOut}</span>
          Logout
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
