import React from "react";

import Header from "./Header";
import { Container } from "@mui/material";
import StepperNav from "./StepperNav";
import StepperOne from "./StepperOne";


function App() {
  return (
  <Container fixed style={{ fontFamily:"sans-serif",  fontSize: "14px"}}>
        <Header/>
        <br/>
        <br/>
        <StepperNav/>
        <br/>
        <StepperOne/>
  
      
      
    </Container>
  
  );
}

export default App;
