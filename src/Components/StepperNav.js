import { Stepper } from "@mui/material";
import React from "react";
import '../style.css'
function StepperNav() {
  return (
    <div className="stepper">
      <div className="Step-complete">1. Submit Application Online</div>
      <div className="Step-todo">2. Review and Confirm Payment</div>
      <div className="Step-todo">3. Receive Approved Visa</div>
    </div>
  );
}

export default StepperNav;
