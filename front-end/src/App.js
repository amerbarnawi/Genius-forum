import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Welcome from "./components/Welcome/Welcome";
import IqTest from "./components/IQ-test/IqTest";
import Forum from "./components/Forum/Forum";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Welcome />} />
            <Route path="iq-test" element={<IqTest />} />
            <Route path="forum" element={<Forum />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
