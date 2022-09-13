import { createContext, useState } from "react";
import { Switch, useLocation, Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import mainRoutes from "./config/routes";
import { AUTH_PATH, TOKEN_STORAGE_NAME } from "./config";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";
import RouterGuard from "./components/RouterGuard";
import useToken from "./components/useToken";

export const AuthContext = createContext({
  authed: false,
  setAuthed: () => {},
});

const App = () => {
  const location = useLocation();
  const { token, setToken } = useToken();

  // Todo: implement refresh token
  const validateToken = (token) => {
    const decoded = token ? jwtDecode(token) : undefined;
    if (!decoded) {
      return false;
    }
    const expUni = decoded.exp;
    if (Date.now() < expUni * 1000) {
      return true;
    } else {
      localStorage.removeItem(TOKEN_STORAGE_NAME);
      return false;
    }
  };

  const [authed, setAuthed] = useState(validateToken(token));

  const value = { authed, setAuthed };

  return (
    <AuthContext.Provider value={value}>
      <div className="App">
        <header className="App-header"></header>
        {location.pathname !== "/login" &&
          !location.pathname.includes("/user") && <Nav />}
        <Switch>
          {mainRoutes.map((route, i) => {
            if (!route.loginRequired || route.path === AUTH_PATH) {
              return (
                <Route
                  key={route.key || i}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  component={route.component}
                />
              );
            } else {
              return (
                <RouterGuard
                  key={route.key || i}
                  path={route.path}
                  exact={route.exact}
                  strict={route.strict}
                  component={route.component}
                />
              );
            }
          })}
          <Redirect from="*" to="/404" />
        </Switch>
        <footer>
          <Footer />
        </footer>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
