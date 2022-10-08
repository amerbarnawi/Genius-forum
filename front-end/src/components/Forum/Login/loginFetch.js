import { useState } from "react";
import { useLoginDetails } from "./LoginProvider";

function useLoginFetch(email, password) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { setUserData, isLoggedIn, setIsLoggedIn } = useLoginDetails();

  async function getUserData() {
    try {
      setIsLoading(true);
      const url = `http://localhost:5000/api/user/login?email=${email}&password=${password}`;
      const response = await fetch(url);
      const userData = await response.json();
      setIsLoading(false);
      if (userData.message) {
        setMessage(userData.message);
      }
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserData(userData);
        sessionStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error) {
      console.log(error);
      setError("Sorry, something went wrong, please try later!");
      setIsLoading(false);
    }
  }
  return { error, isLoading, message, isLoggedIn, getUserData };
}

export default useLoginFetch;
