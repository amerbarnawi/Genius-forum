import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function useDelay(path, time) {
  useEffect(() => {
    const timer = setTimeout(() => {
      <Navigate to={path} />;
    }, time);
    return () => clearTimeout(timer);
  }, [path, time]);
}

export default useDelay;
