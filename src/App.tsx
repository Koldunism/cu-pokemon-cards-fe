import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CardDetail from "./pages/CardDetail/CardDetail";
import Login from "./pages/Login/Login";

const App = () => {
  const [searchParams, setSearchParams] = useState({
    searchName: "",
    searchExpansion: "",
    type: "",
  });
  const [token, setTokenState] = useState<string | null>(null);

  const handleSearch = (params: any) => {
    setSearchParams(params);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setTokenState(token);
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/" element={<Home searchParams={searchParams} />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </div>
  );
};

export default App;
