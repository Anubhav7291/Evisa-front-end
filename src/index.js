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
import InitialPage from "./Components/InitialPage";
import StripeContainer from "./Components/Steppers/StepTwo/StripeContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(window.location.pathname);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container fixed style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
        {window.location.pathname === "/application-form/login" ||
        window.location.pathname === "/application-form/customerDetail" ||
        window.location.pathname === "/application-form/showImage" ||
        window.location.pathname === "/application-form/e-visa" ? null : (
          <Header />
        )}

        <br />
        <br />
        {window.location.pathname === "/application-form/login" ||
        window.location.pathname === "/application-form/customerDetail" ||
        window.location.pathname === "/application-form/showImage" ||
        window.location.pathname === "/application-form/e-visa" ? null : (
          <StepperNav />
        )}
      </Container>
      <Routes>
        <Route exact path="/application-form" element={<App />}></Route>
        <Route exact path="/application-form/register/:id" element={<App />}></Route>
        <Route exact path="/application-form/login" element={<LoginPage />}></Route>
        <Route exact path="/application-form/customerDetail" element={<CustomerDetail />}></Route>
        <Route exact path="/application-form/payment" element={<StripeContainer />}></Route>
        <Route exact path="/application-form/details/:id" element={<Details />}></Route>
        <Route exact path="/application-form/finalStep" element={<FinalStep />}></Route>
        <Route exact path="/application-form/showImage" element={<DisplayImage/>}></Route>
        <Route exact path="/application-form/e-visa" element={<InitialPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
