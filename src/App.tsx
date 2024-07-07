import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

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
      <Home searchParams={searchParams} />
    </div>
  );
};

export default App;
