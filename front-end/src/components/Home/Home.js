import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Home;
