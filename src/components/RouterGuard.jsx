import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../App";
import { AUTH_PATH } from "../config";

const RouterGuard = (props) => {
  const { authed, setAuthed } = useContext(AuthContext);

  return authed ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: AUTH_PATH,
        search: `?from=${encodeURI(
          `${window.location.pathname}?${window.location.search}`
        )}`,
      }}
    ></Redirect>
  );
};

export default RouterGuard;
