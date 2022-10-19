import React from "react";
import "./App.css";
import HomeTable from "./Components/HomeTable";

import { Routes, Route } from "react-router-dom";
import AddCountry from "./Components/AddCountry";
import AddCity from "./Components/AddCity";

function App() {
  return (
    <div style={styles.mainDiv}>
      <Routes>
        <Route path="/" element={<HomeTable />} />
        <Route path="/add-country" element={<AddCountry />} />
        <Route path="/add-city" element={<AddCity />} />
      </Routes>
    </div>
  );
}

export default App;

const styles = {
  mainDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
};
