import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import AddBillboard from "../components/AddBillboard";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Dashboard />
        <AddBillboard/>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
