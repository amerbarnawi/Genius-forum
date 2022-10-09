import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { ReloadProvider } from "../Forum/Providers/ReloadProvider";

function Home() {
  return (
    <div className="home">
      <ReloadProvider>
        <Header />
        <Outlet />
        <Footer />
      </ReloadProvider>
    </div>
  );
}

export default Home;
