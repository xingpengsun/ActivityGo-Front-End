import { useState } from "react";
import { TOKEN_STORAGE_NAME } from "../config";

export default function useToken() {
  const getToken = () => {
    const storage = localStorage.getItem(TOKEN_STORAGE_NAME);
    const access_token = storage ? JSON.parse(storage).access_token : undefined;

    return access_token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_NAME, token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
