import { useState, useEffect } from "react";

function useFetchData(url, isRender) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(`Something went wrong: ${error.message}`);
      }
    })();
  }, [url, setData, isRender]);

  return { data, error, isLoading };
}

export default useFetchData;
