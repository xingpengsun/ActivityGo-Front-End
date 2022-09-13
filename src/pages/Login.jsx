import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SITE_TITLE } from "../config";
import { AuthContext } from "../App";

import "./Login.css";

const Login = () => {
  const { authed, setAuthed } = useContext(AuthContext);
  const location = useLocation();
  const [from, setFrom] = useState(undefined);

  useEffect(() => {
    document.title = `${SITE_TITLE}`;
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const from = query.get("from");
    if (!from || from === "/login") {
      setFrom("");
    } else {
      setFrom(from);
    }
    if (authed) {
      window.location.href = from || "/";
    }
  }, [location, authed]);

  const authBaseUrl =
    "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize";

  const params = {
    response_type: "code",
    client_id: process.env.REACT_APP_FHIR_CLIENT_ID,
    redirect_uri: encodeURI(`${window.origin}/redirect`),
    state: JSON.stringify({
      from: from,
    }),
    aud: process.env.REACT_APP_FHIR_SERVER_URL,
    scope: "fhirUser",
  };

  const link = `${authBaseUrl}?${new URLSearchParams(params).toString()}`;

  const handleLoginClick = function () {
    window.location.replace(link);
  };

  return (
    <div className="page--login">
      <section className="login-container">
        <div className="login-container-white-box">
          <img
            src={process.env.PUBLIC_URL + "logo-dark.png"}
            className="login-logo"
            alt="logo"
          />
          <div className="login-text">Login</div>
          <hr className="horizontal-line" />
          <div className="login-botton-wrap">
            <button
              className="login-oauth-button oauth-button-epic"
              onClick={() => {
                handleLoginClick();
              }}
            >
              <span className="login-oauth-logo-container">
                <img
                  className="login-oauth-logo"
                  src={process.env.PUBLIC_URL + "/epic-logo.png"}
                  alt="epic logo"
                />
              </span>
              <span className="login-oauth-button-text">
                Continue with Epic
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
