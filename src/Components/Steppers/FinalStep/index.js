import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import * as React from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate, useParams } from "react-router-dom";
import "../../../style.css";
import { COUNTRIES, EDUCATION, RELIGION, AIRPORTS} from "../../../utils/Countries";
import { indianStates} from "../../../utils/District";
import Notification from "../../../utils/Notification";
import Spinner from "../../../utils/Spinner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SSLIMAGE from "../../../assets/seal-secured-ssl.png";
import VisaImage from "../../../assets/visapic.svg";
import AMEXImage from "../../../assets/american_express.svg";
import JCBImage from "../../../assets/jcb.svg";
import MAESTROImage from "../../../assets/maestro.svg";
import MCImage from "../../../assets/mastercard.svg";
import UPAY from "../../../assets/union-pay.svg";
import { Checkbox } from "@mui/material";

export default function FinalStep(props) {
  const theme = useTheme();
  const location = useLocation();
  const tempId = location?.state?.tempId;
  const navigate = useNavigate();
  const { id } = useParams();
  
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const res = await axios.get(
  //       process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
  //     );
  //     if (res.data.message === "Success") {
  //       setResult(res.data.data[0]);
  //     }
  //     }
  //     fetchApi()
    
  //   },[])

 
  useEffect(() => {
    const navdom1 = document.querySelector("#Step-payment");
    navdom1.style.backgroundColor = "#1a75ff";
    navdom1.style.color = "white";
    const navdom2 = document.querySelector("#Step-details");
    navdom2.style.backgroundColor = "#1a75ff";
    navdom2.style.color = "white";
  });

  return (
    <>
      <Container
        fixed
        style={{
          fontFamily: "sans-serif",
          marginTop: "17px",
          fontSize: "14px",
          textAlign:"center"
        }}
      >
     <h3>Application Submitted Successfully</h3>
      </Container>
    
    </>
  );
}
