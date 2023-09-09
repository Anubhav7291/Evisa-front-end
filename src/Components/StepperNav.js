import { Stepper } from "@mui/material";
import React from "react";
import '../style.css'
function StepperNav() {
  return (
    <div className="stepper">
      <div className="Step-complete">1. Submit Application Online</div>
      <div id="Step-payment" className="Step-payment">2. Review and Confirm Payment</div>
      <div id="Step-details" className="Step-details">3. Receive Approved Visa</div>
    </div>
  );
}

export default StepperNav;
