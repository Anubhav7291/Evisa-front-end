import React from "react";

import Header from "./Header";
import { Container } from "@mui/material";
import StepperNav from "./StepperNav";
import StepperOne from "./StepperOne";

function App() {
  return (
    <Container maxWidth='lg' style={{padding:0, fontFamily:"sans-serif"}}>
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
