import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom/dist";
import LoginPage from "./Components/AdminPanel/LoginPage";
import Payment from "./Components/Steppers/StepTwo/Payment";
import Details from "./Components/Steppers/StepThree/Details";
import Header from "./Components/Header";
import StepperNav from "./Components/StepperNav";
import { Container } from "@mui/material";
import CustomerDetail from "./Components/AdminPanel/CustomerDetail.js/index.js";
import FinalStep from "./Components/Steppers/FinalStep/index.js";
import DisplayImage from "./Components/AdminPanel/CustomerDetail.js/DisplayImage";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.pathname);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container fixed style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
        {window.location.pathname === "/login" ||
        window.location.pathname === "/customerDetail" ||
        window.location.pathname === "/showImage" ? null : (
          <Header />
        )}

        <br />
        <br />
        {window.location.pathname === "/login" ||
        window.location.pathname === "/customerDetail" ||
        window.location.pathname === "/showImage" ? null : (
          <StepperNav />
        )}
      </Container>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register/:id" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/customerDetail" element={<CustomerDetail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/finalStep" element={<FinalStep />}></Route>
        <Route path="/showImage" element={<DisplayImage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
