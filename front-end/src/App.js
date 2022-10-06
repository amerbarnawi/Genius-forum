import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Welcome from "./components/Welcome/Welcome";
import IqTest from "./components/IQ-test/IqTest";
import { LoginProvider } from "./components/Forum/Login/LoginProvider";
import Forum from "./components/Forum/Forum";
import Login from "./components/Forum/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ChallengeById from "./components/Forum/Main/Challenge/DeliveryPage";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="iq-test" element={<IqTest />} />
              <Route element={<ProtectedRoute />}>
                <Route path="forum" element={<Forum />} replace>
                  <Route
                    path="challenge/:id"
                    element={<ChallengeById />}
                    replace
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;
