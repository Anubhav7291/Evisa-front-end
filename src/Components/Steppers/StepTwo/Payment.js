import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment(props) {
  const navigate = useNavigate();
  const tempId = props?.location?.state;
  useEffect(() => {
    const navdom = document.querySelector("#Step-payment");
    navdom.style.backgroundColor = "#1a75ff";
    navdom.style.color = "white";
  });

  const handleClick = () => {
    navigate("/details", { state: { tempId: tempId } });
  };
  return (
    <div>
      Payment
      <button onClick={handleClick}>next</button>
    </div>
  );
}

export default Payment;
