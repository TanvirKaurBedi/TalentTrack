import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "../src/pages/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={SearchPage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
