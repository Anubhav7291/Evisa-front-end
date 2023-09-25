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
        }}
      >
        <Card>
          <CardHeader
            style={{
              backgroundColor: "#1a75ff",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "6px",
            }}
          >
            Details of Visa Sought
          </CardHeader>
          {
            <Notification
              open={notification.open}
              content={notification.content}
              handleClose={setOpen}
            ></Notification>
          }
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      id="visaType"
                      name="visaType"
                      fullWidth
                      label="Type of Visa"
                      value={formik.values.visaType}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      id="visaService"
                      name="visaService"
                      fullWidth
                      label="Visa Service"
                      value={formik.values.visaService}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_placetoVisited"
                      name="F_placetoVisited"
                      label="Places to be visited"
                      onChange={formik.handleChange}
                      value={formik.values.F_placetoVisited}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_placetoVisited &&
                        Boolean(formik.errors.F_placetoVisited)
                      }
                      helperText={
                        formik.touched.F_placetoVisited &&
                        formik.errors.F_placetoVisited
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_placetoVisitedOther"
                      name="F_placetoVisitedOther"
                      label="Places to be visited line 2"
                      onChange={formik.handleChange}
                      value={formik.values.F_placetoVisitedOther}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_placetoVisitedOther &&
                        Boolean(formik.errors.F_placetoVisitedOther)
                      }
                      helperText={
                        formik.touched.F_placetoVisitedOther &&
                        formik.errors.F_placetoVisitedOther
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <span>
                      Have you booked any room in Hotel/Resort etc. through any
                      tour operator
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="yesBooked"
                        id="check1"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.noBooked &&
                            !formik.values.yesBooked
                          ) {
                            formik.setFieldValue("noBooked", false);
                            formik.setFieldValue("yesBooked", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="noBooked"
                        id="check1"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.yesBooked &&
                            !formik.values.noBooked
                          ) {
                            formik.setFieldValue("noBooked", true);
                            formik.setFieldValue("yesBooked", false);
                            
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.yesBooked ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputProps={{
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="tourOperator"
                          name="tourOperator"
                          label="Name of Tour Operator"
                          onChange={formik.handleChange}
                          value={formik.values.tourOperator}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.tourOperator &&
                            Boolean(formik.errors.tourOperator)
                          }
                          helperText={
                            formik.touched.tourOperator &&
                            formik.errors.tourOperator
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputProps={{
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="tourAddress"
                          name="tourAddress"
                          label="Address of Tour operator"
                          onChange={formik.handleChange}
                          value={formik.values.tourAddress}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.tourAddress &&
                            Boolean(formik.errors.tourAddress)
                          }
                          helperText={
                            formik.touched.tourAddress &&
                            formik.errors.tourAddress
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputProps={{
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="resortName"
                          name="resortName"
                          label="Name of Hotel/Resort etc."
                          onChange={formik.handleChange}
                          value={formik.values.resortName}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.resortName &&
                            Boolean(formik.errors.resortName)
                          }
                          helperText={
                            formik.touched.resortName &&
                            formik.errors.resortName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputProps={{
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="hotelPlace"
                          name="hotelPlace"
                          label="Place/City of Hotel/Resort etc."
                          onChange={formik.handleChange}
                          value={formik.values.hotelPlace}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.hotelPlace &&
                            Boolean(formik.errors.hotelPlace)
                          }
                          helperText={
                            formik.touched.hotelPlace &&
                            formik.errors.hotelPlace
                          }
                        />
                      </Grid>
                    </>
                  ) : null}

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="visaDuration"
                      name="visaDuration"
                      label="Duration of Visa"
                      onChange={formik.handleChange}
                      value={formik.values.visaDuration}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.visaDuration && Boolean(formik.errors.visaDuration)
                      }
                      helperText={formik.touched.visaDuration && formik.errors.visaDuration}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="noEntries"
                      name="noEntries"
                      label="No. of Entries"
                      onChange={formik.handleChange}
                      value={formik.values.noEntries}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.noEntries && Boolean(formik.errors.noEntries)
                      }
                      helperText={formik.touched.noEntries && formik.errors.noEntries}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      id="POA"
                      name="POA"
                      label="Port of Arrival in India"
                      onChange={formik.handleChange}
                      value={formik.values.POA}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.POA && Boolean(formik.errors.POA)
                      }
                      helperText={formik.touched.POA && formik.errors.POA}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      select
                      fullWidth
                      id="EPOA"
                      name="EPOA"
                      label="Expected Port of Exit from India"
                      onChange={formik.handleChange}
                      value={formik.values.EPOA}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.EPOA && Boolean(formik.errors.EPOA)
                      }
                      helperText={formik.touched.EPOA && formik.errors.EPOA}
                    >
                        {AIRPORTS.map((val) => {
                    return (
                      <MenuItem
                        key={val.airport_name}
                        value={val.airport_name.toUpperCase()}
                      >
                        {val.airport_name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
                    </TextField>
                  </Grid>
                </Grid>

                {loader && <Spinner></Spinner>}
              </CardContent>
              <CardHeader
                style={{
                  backgroundColor: "#1a75ff",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "6px",
                }}
              >
                Other Information
              </CardHeader>
              <CardContent>
                <Grid item xs={12} md={6}>
                  <TextField
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
                    select
                    SelectProps={{
                        multiple: true,
                        renderValue: (selected) => selected.join(', '), // Display selected options as a comma-separated string
                      }}
                    fullWidth
                    id="listOfCountry"
                    name="listOfCountry"
                    label="Countries Visited in Last 10 years "
                    onChange={formik.handleChange}
                    value={formik.values.listOfCountry}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.listOfCountry && Boolean(formik.errors.listOfCountry)
                    }
                    helperText={formik.touched.listOfCountry && formik.errors.listOfCountry}
                  >
                    {COUNTRIES.map((val) => {
                      return <MenuItem value={val.name}>{val.name}</MenuItem>;
                    })}
                  </TextField>
                </Grid>
              </CardContent>
              <CardHeader
                style={{
                  backgroundColor: "#1a75ff",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "6px",
                }}
              >
                SAARC Country Visit Details
              </CardHeader>
              <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
                  <Grid item xs={12} md={8}>
                    <span>
                      Have you visited SAARC Countries (except your own country)
                      during last 3 years
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="yesSAARC"
                        id="check2"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.noSAARC &&
                            !formik.values.yesSAARC
                          ) {
                            formik.setFieldValue("noSAARC", false);
                            formik.setFieldValue("yesSAARC", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="noSAARC"
                        id="check2"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.yesSAARC &&
                            !formik.values.noSAARC
                          ) {
                            formik.setFieldValue("noSAARC", true);
                            formik.setFieldValue("yesSAARC", false);
                            
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                </Grid>
                <br></br>
                {formik.values.yesSAARC ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="SAARCDetails"
                        name="SAARCDetails"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.SAARCDetails}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.SAARCDetails &&
                          Boolean(formik.errors.SAARCDetails)
                        }
                        helperText={
                          formik.touched.SAARCDetails &&
                          formik.errors.SAARCDetails
                        }
                      />
                    </Grid>
                  </>
                ) : null}
              </CardContent>

              <CardHeader
                style={{
                  backgroundColor: "#1a75ff",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "6px",
                }}
              >
                Reference
              </CardHeader>
              <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
                
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_refenencename"
                      name="F_refenencename"
                      label="Reference Name in India"
                      onChange={formik.handleChange}
                      value={formik.values.F_refenencename}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_refenencename &&
                        Boolean(formik.errors.F_refenencename)
                      }
                      helperText={
                        formik.touched.F_refenencename &&
                        formik.errors.F_refenencename
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_address"
                      name="F_address"
                      label="Address"
                      onChange={formik.handleChange}
                      value={formik.values.F_address}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_address &&
                        Boolean(formik.errors.F_address)
                      }
                      helperText={
                        formik.touched.F_address &&
                        formik.errors.F_address
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_state"
                      name="F_state"
                      label="State"
                      onChange={formik.handleChange}
                      value={formik.values.F_state}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_state &&
                        Boolean(formik.errors.F_state)
                      }
                      helperText={
                        formik.touched.F_state &&
                        formik.errors.F_state
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_district"
                      name="F_district"
                      label="District"
                      onChange={formik.handleChange}
                      value={formik.values.F_district}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_district &&
                        Boolean(formik.errors.F_district)
                      }
                      helperText={
                        formik.touched.F_district &&
                        formik.errors.F_district
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_phone"
                      name="F_phone"
                      label="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.F_phone}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_phone &&
                        Boolean(formik.errors.F_phone)
                      }
                      helperText={
                        formik.touched.F_phone &&
                        formik.errors.F_phone
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="F_anguilla"
                      name="F_anguilla"
                      label="Reference name in ANGUILLA"
                      onChange={formik.handleChange}
                      value={formik.values.F_anguilla}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.F_anguilla &&
                        Boolean(formik.errors.F_anguilla)
                      }
                      helperText={
                        formik.touched.F_anguilla &&
                        formik.errors.F_anguilla
                      }
                    ></TextField>
                  </Grid>

                  {/* <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="martialStatus"
                      name="martialStatus"
                      label="Address"
                      onChange={formik.handleChange}
                      value={formik.values.martialStatus}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.martialStatus &&
                        Boolean(formik.errors.martialStatus)
                      }
                      helperText={
                        formik.touched.martialStatus &&
                        formik.errors.martialStatus
                      }
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="martialStatus"
                      name="martialStatus"
                      label="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.martialStatus}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.martialStatus &&
                        Boolean(formik.errors.martialStatus)
                      }
                      helperText={
                        formik.touched.martialStatus &&
                        formik.errors.martialStatus
                      }
                    ></TextField>
                  </Grid> */}
                </Grid>
              </CardContent>

              {formik.values.isBusiness ? 
              <>
                 <CardHeader
                style={{
                  backgroundColor: "#1a75ff",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "6px",
                }}
              >
                Details of Purpose " TO SET UP INDUSTRIAL/BUSINESS VENTURE "
              </CardHeader>
                <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
                
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="FB_name"
                      name="FB_name"
                      label="Name"
                      onChange={formik.handleChange}
                      value={formik.values.FB_name}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FB_name &&
                        Boolean(formik.errors.FB_name)
                      }
                      helperText={
                        formik.touched.FB_name &&
                        formik.errors.FB_name
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="FB_address"
                      name="FB_address"
                      label="Address, Phone no"
                      onChange={formik.handleChange}
                      value={formik.values.FB_address}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FB_address &&
                        Boolean(formik.errors.FB_address)
                      }
                      helperText={
                        formik.touched.FB_address &&
                        formik.errors.FB_address
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      select
                      id="FB_website"
                      name="FB_website"
                      label="Website"
                      onChange={formik.handleChange}
                      value={formik.values.FB_website}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FB_website &&
                        Boolean(formik.errors.FB_website)
                      }
                      helperText={
                        formik.touched.FB_website &&
                        formik.errors.FB_website
                      }
                    > {indianStates.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}</TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="FB_product"
                      name="FB_product"
                      label="Nature of Business/Product"
                      onChange={formik.handleChange}
                      value={formik.values.FB_product}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FB_product &&
                        Boolean(formik.errors.FB_product)
                      }
                      helperText={
                        formik.touched.FB_product &&
                        formik.errors.FB_product
                      }
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="FB_duration"
                      name="FB_duration"
                      label="Duration of Visa"
                      onChange={formik.handleChange}
                      value={formik.values.FB_duration}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FB_duration &&
                        Boolean(formik.errors.FB_duration)
                      }
                      helperText={
                        formik.touched.FB_duration &&
                        formik.errors.FB_duration
                      }
                    ></TextField>
                  </Grid>
               
                </Grid>
              </CardContent>
              </>
              :null}
              <div
                className="next-button"
                style={{ marginBottom: "10px", marginRight: "10px" }}
              >
                <Button type="submit" variant="contained" color="success">
                  Finish
                </Button>
              </div>
            </form>
          </FormikProvider>
        </Card>
      </Container>
      <div style={{ backgroundColor: "#e6f9ff" }}>
        <div style={{ paddingTop: "10px", display: "flex" }}>
          <div style={{ float: "left", marginLeft: "7%" }}>
            <img src={SSLIMAGE} height="50px" width="100px" />
            <p>
              Your personal information is securely encrypted by Secure Sockets
              Layer (SSL) software
            </p>
          </div>

          <div style={{ float: "right", marginLeft: "30px" }}>
            <img
              src={VisaImage}
              alt="Visa Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
            <img
              src={MCImage}
              alt="MasterCard Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
            <img
              src={AMEXImage}
              alt="American Express Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
            <img
              src={MAESTROImage}
              alt="American Express Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
            <img
              src={UPAY}
              alt="American Express Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
            <img
              src={JCBImage}
              alt="American Express Logo"
              style={{ marginLeft: "12px" }}
              height="35px"
              width="40px"
            />
          </div>
        </div>
      </div>
    </>
  );
}
