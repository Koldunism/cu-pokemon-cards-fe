import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CardDetail from "./pages/CardDetail/CardDetail";

const App = () => {
  const [searchParams, setSearchParams] = useState({
    searchName: "",
    searchExpansion: "",
    type: "",
  });

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchParams={searchParams} />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </div>
  );
};

export default App;
