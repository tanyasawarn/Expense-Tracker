import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from "./pages/Login/Signup";
  import "./App.css";
import Login from "./pages/Login/Login";

function App() {
 

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
