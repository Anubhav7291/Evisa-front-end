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

  const [loader, setLoader] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [notification, setNotification] = React.useState({
    open: false,
    content: "",
  });
  const { id } = useParams();
  
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
      );
      if (res.data.message === "Success") {
        setResult(res.data.data[0]);
      }
      }
      fetchApi()
    
    },[])

  const formik = useFormik({
    initialValues: {
        visaType:"e-Visa",
        visaService:result?.visaService,
      listOfCountry:[],
      F_placetoVisited:"",
      F_placetoVisitedOther:"",
      yesBooked:false,
      noBooked:true,
      noSAARC:true,
      isBusiness: result.visaService === "eBUSINESS VISA" ? true : false,
      yesSAARC:false,
      SAARCDetails:"",
      tourAddress:"",
      tourOperator:"",
      resortName:"",
      hotelPlace:"",
      visaDuration:"",
      noEntries:"",
      POA:result?.portOfArrival,
      EPOA:"",
      F_address:""  ,
      F_anguilla:""     ,
      F_district:""   ,
      F_phone:"",
     F_refenencename:"",
      street: "",
    
    },
    //validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // Initialize an empty FormData object
      const formData = new FormData();
      console.log(values);
      console.log("formData", tempId);

      // Add each field to the FormData object
      formData.append("id", tempId);
      formData.append("village", values.village);
      formData.append("street", values.street);

      formData.append("addresscountry", values.street);
      formData.append("state", values.state);
      formData.append("postal", values.postal);
      formData.append("fatherName", values.fatherName);
      formData.append("fatherNation", values.fatherNation);
      formData.append("fatherBirth", values.fatherBirth);
      formData.append("fatherCountry", values.fatherCountry);
      formData.append("motherName", values.motherName);
      formData.append("motherNation", values.motherNation);
      formData.append("motherBirth", values.motherBirth);
      formData.append("motherCountry", values.motherCountry);
      formData.append("martialStatus", values.martialStatus);
      formData.append("spouseName", values.spouseName);
      formData.append("spouseNation", values.spouseNation);
      formData.append("spousePlace", values.spousePlace);
      formData.append("spouseCountry", values.spouseCountry);
      formData.append("spouseOccupation", values.spouseOccupation);
      formData.append("spousePhone", values.spousePhone);
      formData.append("defenceOrganization", values.defenceOrganization);
      formData.append("defenceDesignation", values.defenceDesignation);
      formData.append("defenceRank", values.defenceRank);
      formData.append("defencePosting", values.defencePosting);
      formData.append("viPreviousCity", values.viPreviousCity);
      formData.append("viAddress", values.viAddress);
      formData.append("viCountry", values.viCountry);
      formData.append("viVisa", values.viVisa);
      formData.append("viPlaceIssue", values.viPlaceIssue);
      formData.append("viDateIssue", values.viDateIssue);
      formData.append("extendedControlNo", values.extendedControlNo);
      formData.append("extendedDate", values.extendedDate);
      formData.append("Q1Detail", values.Q1Detail);
      formData.append("Q2Detail", values.Q2Detail);
      formData.append("Q3Detail", values.Q3Detail);
      formData.append("Q4Detail", values.Q4Detail);
      formData.append("Q5Detail", values.Q5Detail);
      formData.append("Q6Detail", values.Q6Detail);
      formData.append("applicantFile", values.applicantFile); // You can append files here if needed
      formData.append("passportFile", values.passportFile); // You can append files here if needed

      // Now you can use this formData object to send data in a POST request or perform any other desired actions.
      console.log(formData.get("applicantFile"));
      setLoader(true);
      try {
        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + `/otherDetails`,
          formData
        );
        if (response.data.message === "Success") {
          navigate("/payment");
        }
      } catch (error) {}
      setLoader(false);
    },
    handleChange: () => {
      console.log("claal");
    },
  });

  const setOpen = () => {
    setNotification({ ...notification, open: false, content: "" });
  };

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
