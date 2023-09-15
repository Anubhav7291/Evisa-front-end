import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom/dist';
import LoginPage from './Components/AdminPanel/LoginPage';
import Payment from './Components/Steppers/StepTwo/Payment';
import Details from './Components/Steppers/StepThree/Details';
import Header from './Components/Header';
import StepperNav from './Components/StepperNav';
import { Container } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
    <Routes>
    <Route path="/login"  element={ <LoginPage /> }></Route>
    </Routes>
  
   <Container fixed style={{ fontFamily:"sans-serif",  fontSize: "14px"}}>
   <Header/>
   
   <br/>
   <br/>
   <StepperNav/>
   </Container>
      <Routes>
        <Route path="/" element={ <App /> }></Route>
        <Route path="/register/:id"  element={ <App /> }></Route>
       
        <Route path="/payment"  element={ <Payment /> }></Route>
        <Route path="/details"  element={ <Details /> }></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
