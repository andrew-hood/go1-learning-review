import React from "react";
import axios from "axios";
import useAccessToken from "./useLogin";

const useFetchData = <T>(
  url: string
): { isLoading: boolean; data: T | undefined } => {
  const {token} = useAccessToken();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<T>();

  React.useEffect(() => {
    let response;
    (async function () {
      if (token) {
        response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
        setIsLoading(false);
      }
    })();
    return () => {};
  }, [token]);

  return { isLoading, data };
};
export { useFetchData }