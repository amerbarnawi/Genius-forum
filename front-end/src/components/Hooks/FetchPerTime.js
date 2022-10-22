import { useState, useEffect } from "react";

function useFetchPerTime(url, period) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState({});
  const [isMessages, setIsMessage] = useState(true);

  useEffect(() => {
    if (!isMessages) {
      return;
    }
    const id = setInterval(async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length <= 0) {
          setIsMessage(true);
        }
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(`Something went wrong, try later!`);
        console.log(error.message);
      }
    }, period);

    return () => clearInterval(id);
  });

  return { data, error, isLoading };
}

export default useFetchPerTime;
