import { useContext, useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Result } from "antd";
import { AuthContext } from "../App";
import useToken from "../components/useToken";
import { SITE_TITLE } from "../config";
import { postAccessWithEpic } from "../services/request/api";

// This page will handle the query send from oauth provider via callback url
// and update the login status
const Redirect = () => {
  const { authed, setAuthed } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [fromURL, setFromURL] = useState("/");
  const { token, setToken } = useToken();

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();

  useEffect(() => {
    document.title = `${SITE_TITLE}`;
  }, []);

  useEffect(() => {
    const code = query.get("code");
    const state = query.get("state");

    if (!code) {
      return setError("Authentication Failed");
    }

    if (state) {
      const decodeState = JSON.parse(state);
      const from = decodeState.from;
      if (from && from !== "/login") {
        setFromURL(from);
      }
    }

    const getAccessToken = async (authToken) => {
      try {
        const res = await postAccessWithEpic(authToken);
        setToken(JSON.stringify(res));
        window.location.href = fromURL;
      } catch (error) {
        setError("Authorization Error.");
      }
    };

    if (code && !token) {
      getAccessToken(code);
    }
  }, [fromURL, query, setAuthed, setToken, token]);

  return (
    <div className="page--redirect">
      {error ? (
        <Result
          status="error"
          title={error}
          subTitle="No worries, it looks like something went worng from our side. You can try again later."
        />
      ) : (
        <Result
          title="Redirecting you to requested page..."
          extra={<div>{fromURL}</div>}
        />
      )}
    </div>
  );
};

export default Redirect;
