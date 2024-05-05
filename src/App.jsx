import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "../src/pages/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/s" element={<SearchPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
