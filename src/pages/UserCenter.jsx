import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router";
import UserCenterHeading from "../components/UserCenter/common/UserCenterHeading";
import SideMenu from "../components/UserCenter/SideMenu";
import { userCenterRoutes } from "../config/routes";
import { USER_CENTER_SIDEMENU_NAV } from "../config/user";
import { getUserFirstName } from "../services/request/api";
import "./UserCenter.css";

const UserCenter = ({ routes }) => {
  const location = useLocation();
  const [firstname, setFirstname] = useState(undefined);

  useEffect(() => {
    const getFirstname = async () => {
      const res = await getUserFirstName();
      setFirstname(res.firstname);
    };
    if (!firstname) {
      getFirstname();
    }
  }, [firstname]);

  return (
    <div className="page--user-center">
      {/* <Redirect to="/user/dashboard" /> */}
      <div className="user-center-container">
        <div className="user-center-sidemenu-container">
          <SideMenu />
        </div>
        <div className="user-center-subpage-container">
          <UserCenterHeading
            pageName={
              USER_CENTER_SIDEMENU_NAV.filter(
                (item) => item.route === location.pathname
              )[0].name
            }
            username={firstname}
            userAvatarUrl="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
          />
          <Switch>
            {userCenterRoutes.map((route, i) => {
              return (
                <Route
                  component={route.component}
                  key={i}
                  path={route.path}
                ></Route>
              );
            })}
            <Redirect from="/user" to="/user/dashboard" exact></Redirect>
            <Redirect from="*" to="/404"></Redirect>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default UserCenter;
