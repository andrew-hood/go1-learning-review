import { useState, useEffect, useRef } from "react";

function useAccessToken() {
  const [token, setToken] = useState<string|null>();
  const [params, setParams] = useState<URLSearchParams>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    if (window.localStorage.getItem('token')) {
      setToken(window.localStorage.getItem('token') as string);
    } else if (params) {
      setParams(params);
    }
  }, [])

  useEffect(() => {
    const token = params?.get('access_token') as string;
    if (token) {
      setToken(token);
      window.localStorage.setItem('token', token);
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }, [params]);

  const refreshToken = () => {
    window.location.assign(`https://auth.go1.com/oauth/authorize?response_type=token&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&scope=user.read account.read lo.read enrollment.read`)
  };

  const resetToken = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
  }

  return { token, refreshToken, resetToken };
};

export default useAccessToken;