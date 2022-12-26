import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Renting from "./pages/Renting";
import Payment from "./pages/Payment";

import { useStateBlockchainContext } from "./contexts/BlockchainContext";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { renterExists } = useStateBlockchainContext();
  return (
    <>
      <BrowserRouter basename="/">
        <Navbar />
        {/* Routes */}
        <Routes>
          {/* Display snowboards selection if connected. If not, display homepage. */}
          <Route path="/" element={renterExists ? <Rent /> : <Home />} />
          <Route path="/renting" element={<Renting />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
