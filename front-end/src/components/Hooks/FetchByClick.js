import { useState, useEffect } from "react";

function useFetchByClick(isClicked, setIsClicked, url, requestOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        if (isClicked) {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          setData(data);
          setIsLoading(false);
          setIsClicked(false);
        }
      } catch (error) {
        console.log("hon");
        setIsLoading(false);
        setError(`Something went wrong: ${error.message}`);
      }
    })();
  }, [url, isClicked, requestOptions, setIsClicked]);

  return { data, error, isLoading };
}

export default useFetchByClick;
