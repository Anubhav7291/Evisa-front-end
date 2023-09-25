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
import { COUNTRIES, EDUCATION, RELIGION } from "../../../utils/Countries";
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
// const validationSchema = yup.object({
//   city: yup.string("Enter your city"),
//   country: yup.string("Enter your country"),
//   citizenship: yup.string("Enter your citizenship"),
//   religion: yup
//     .string("Enter your religion")
//     .required("Religion name is required"),
//   mark: yup
//     .string("Enter your Verification mark")
//     .required("Verification mark is required"),
//   qualification: yup
//     .string("Enter your Port of qualification")
//     .required("Qualification is required"),
//   passportNumber: yup
//     .string("Enter your Passport Number")
//     .required("Passport Number is required"),
//   issueDate: yup
//     .string("Enter your Issue Date")
//     .required("Issue Date is required"),
//   expiryDate: yup
//     .string("Enter your expected Expiry Date")
//     .required("Expiry Date is required"),
//   IssueCountry: yup.string("Enter your Issue Country"),
//   otherPassportNumber: yup.string("Enter your Passport Number"),

//   otherDateOfIssue: yup.string("Enter your Date Of Issue"),
//   otherPlaceIssue: yup.string("Enter your Place Issue"),
//   otherNationality: yup.string("Enter your Nationality"),
// });

export default function Details(props) {
  const theme = useTheme();
  const location = useLocation();
  const tempId = location?.state?.tempId;
  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const [agree, setAgree] =  React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    content: "",
  });
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      street: "",
      village: "",
      addresscountry: "",
      state: "",
      postal: "",
      street2: "",
      village2: "",
      addresscountry2: "",
      state2: "",
      postal2: "",
      fatherName: "",
      fatherNation: "",
      fatherBirth: "",
      fatherCountry: "",
      fatherPrevCountry: "",
      motherName: "",
      motherNation: "",
      motherBirth: "",
      motherCountry: "",
      motherPrevCountry: "",
      martialStatus: "",
      spouseName: "",
      spouseNation: "",
      spousePlace: "",
      spouseAddress: "",
      spouseCountry: "",
      spousePrevNation: "",
      spouseOccupation: "",
      spousePhone: "",
      yesDefence: "",
      defenceOrganization: "",
      defenceDesignation: "",
      defenceRank: "",
      defencePosting: "",
      viAddress: "",
      viPreviousCity: "",
      viCountry: "",
      viVisa: "",
      viPlaceIssue: "",
      viDateIssue: "",
      noDefence: true,
      yesVisitedIndia: "",
      noVisitedIndia: true,
      yesExtended: "",
      noExtended: true,
      extendedControlNo: "",
      extendedDate: "",
      Q1No: true,
      Q1Yes: "",
      Q1Detail: "",
      Q2No: true,
      Q2Yes: "",
      Q2Detail: "",
      Q3No: true,
      Q3Yes: "",
      Q3Detail: "",
      Q4No: true,
      Q4Yes: "",
      Q4Detail: "",
      Q5No: true,
      Q5Yes: "",
      Q5Detail: "",
      Q6No: true,
      Q6Yes: "",
      Q6Detail: "",
      Q7No: true,
      Q7Yes: "",
      Q7Detail: "",
      applicantFile: "",
      passportFile: "",
    },
    //validationSchema: validationSchema,
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
          navigate("/finalStep",{ state: {tempId:tempId} });
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
            Applicant's Address
          </CardHeader>
          <CardHeader
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              >
                Present Address
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
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
                      id="street"
                      name="street"
                      label="House No./Street"
                      onChange={formik.handleChange}
                      value={formik.values.street}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.street && Boolean(formik.errors.street)
                      }
                      helperText={formik.touched.street && formik.errors.street}
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
                      id="village"
                      name="village"
                      label="Village/Town/City"
                      onChange={formik.handleChange}
                      value={formik.values.village}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.village && Boolean(formik.errors.village)
                      }
                      helperText={
                        formik.touched.village && formik.errors.village
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
                      select
                      id="addresscountry"
                      name="addresscountry"
                      label="Country"
                      type="religion"
                      onChange={formik.handleChange}
                      value={formik.values.addresscountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.addresscountry &&
                        Boolean(formik.errors.addresscountry)
                      }
                      helperText={
                        formik.touched.addresscountry &&
                        formik.errors.addresscountry
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return (
                          <MenuItem key={val.name} value={val.name}>
                            {val.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
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
                      id="state"
                      name="state"
                      label="State/Province/District"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                      helperText={formik.touched.state && formik.errors.state}
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
                      id="postal"
                      name="postal"
                      label="Postal/Zip Code"
                      onChange={formik.handleChange}
                      value={formik.values.postal}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.postal && Boolean(formik.errors.postal)
                      }
                      helperText={formik.touched.postal && formik.errors.postal}
                    />
                  </Grid>
                </Grid>
                Click here for same address 
                <Checkbox
                  inputProps={{ "aria-label": "primary checkbox" }}
                  checked={agree}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.visaOptions &&
                    Boolean(formik.errors.visaOptions)
                  }
                  onChange={() => {
                    if (agree) {
                      setAgree(false);
                      formik.setFieldValue("street2", "");
                      formik.setFieldValue("village2", "");
                      formik.setFieldValue("addresscountry2", "");
                      formik.setFieldValue("state2", "");
                      formik.setFieldValue("postal2", "");
                    } else {
                      setAgree(true);
                      formik.setFieldValue("street2", formik.values.street);
                      formik.setFieldValue("village2", formik.values.village);
                      formik.setFieldValue("addresscountry2", formik.values.addresscountry);
                      formik.setFieldValue("state2", formik.values.state);
                      formik.setFieldValue("postal2", formik.values.postal);
                    
                    }
                  }}
                />
                <CardHeader
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                 
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                Permanent Address
              </CardHeader>

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
                      id="street"
                      name="street"
                      label="House No./Street"
                      onChange={formik.handleChange}
                      value={formik.values.street2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.street2 && Boolean(formik.errors.street2)
                      }
                      helperText={formik.touched.street2 && formik.errors.street2}
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
                      id="village"
                      name="village"
                      label="Village/Town/City"
                      onChange={formik.handleChange}
                      value={formik.values.village2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.village2 && Boolean(formik.errors.village2)
                      }
                      helperText={
                        formik.touched.village2 && formik.errors.village2
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
                      select
                      id="addresscountry"
                      name="addresscountry"
                      label="Country"
                      type="religion"
                      onChange={formik.handleChange}
                      value={formik.values.addresscountry2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.addresscountry2 &&
                        Boolean(formik.errors.addresscountry2)
                      }
                      helperText={
                        formik.touched.addresscountry2 &&
                        formik.errors.addresscountry2
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return (
                          <MenuItem key={val.name} value={val.name}>
                            {val.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
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
                      id="state"
                      name="state"
                      label="State/Province/District"
                      onChange={formik.handleChange}
                      value={formik.values.state2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.state2 && Boolean(formik.errors.state2)
                      }
                      helperText={formik.touched.state2 && formik.errors.state2}
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
                      id="postal"
                      name="postal"
                      label="Postal/Zip Code"
                      onChange={formik.handleChange}
                      value={formik.values.postal2}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.postal2 && Boolean(formik.errors.postal2)
                      }
                      helperText={formik.touched.postal2 && formik.errors.postal2}
                    />
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
                Family details
              </CardHeader>
              <CardHeader
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              >
                Father's details
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
                      id="fatherName"
                      name="fatherName"
                      label="Name"
                      onChange={formik.handleChange}
                      value={formik.values.fatherName}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fatherName &&
                        Boolean(formik.errors.fatherName)
                      }
                      helperText={
                        formik.touched.fatherName && formik.errors.fatherName
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
                      select
                      id="fatherNation"
                      name="fatherNation"
                      label="Nationality/Religion"
                      onChange={formik.handleChange}
                      value={formik.values.fatherNation}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fatherNation &&
                        Boolean(formik.errors.fatherNation)
                      }
                      helperText={
                        formik.touched.fatherNation &&
                        formik.errors.fatherNation
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
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
                      id="fatherBirth"
                      name="fatherBirth"
                      label="Place of birth"
                      onChange={formik.handleChange}
                      value={formik.values.fatherBirth}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fatherBirth &&
                        Boolean(formik.errors.fatherBirth)
                      }
                      helperText={
                        formik.touched.fatherBirth && formik.errors.fatherBirth
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
                      select
                      fullWidth
                      id="fatherCountry"
                      name="fatherCountry"
                      label="Country/Region of birth"
                      onChange={formik.handleChange}
                      value={formik.values.fatherCountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fatherCountry &&
                        Boolean(formik.errors.fatherCountry)
                      }
                      helperText={
                        formik.touched.fatherCountry &&
                        formik.errors.fatherCountry
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
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
                      id="fatherPrevCountry"
                      name="fatherPrevCountry"
                      label="Previous Nationality/Region"
                      onChange={formik.handleChange}
                      value={formik.values.fatherPrevCountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fatherPrevCountry &&
                        Boolean(formik.errors.fatherPrevCountry)
                      }
                      helperText={
                        formik.touched.fatherPrevCountry &&
                        formik.errors.fatherPrevCountry
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>

              <CardHeader
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
              >
                Mother's details
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
                      id="motherName"
                      name="motherName"
                      label="Name"
                      onChange={formik.handleChange}
                      value={formik.values.motherName}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.motherName &&
                        Boolean(formik.errors.motherName)
                      }
                      helperText={
                        formik.touched.motherName && formik.errors.motherName
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
                      select
                      id="motherNation"
                      name="motherNation"
                      label="Nationality/Religion"
                      onChange={formik.handleChange}
                      value={formik.values.motherNation}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.motherNation &&
                        Boolean(formik.errors.motherNation)
                      }
                      helperText={
                        formik.touched.motherNation &&
                        formik.errors.motherNation
                      }
                    >
                      {" "}
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
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
                      id="motherBirth"
                      name="motherBirth"
                      label="Place of birth"
                      type="religion"
                      onChange={formik.handleChange}
                      value={formik.values.motherBirth}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.motherBirth &&
                        Boolean(formik.errors.motherBirth)
                      }
                      helperText={
                        formik.touched.motherBirth && formik.errors.motherBirth
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
                      select
                      fullWidth
                      id="motherCountry"
                      name="motherCountry"
                      label="Country/Region of birth"
                      onChange={formik.handleChange}
                      value={formik.values.motherCountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.motherCountry &&
                        Boolean(formik.errors.motherCountry)
                      }
                      helperText={
                        formik.touched.motherCountry &&
                        formik.errors.motherCountry
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
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
                      id="motherPrevCountry"
                      name="motherPrevCountry"
                      label="Previous Nationality/Region"
                      onChange={formik.handleChange}
                      value={formik.values.motherPrevCountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.motherPrevCountry &&
                        Boolean(formik.errors.motherPrevCountry)
                      }
                      helperText={
                        formik.touched.motherPrevCountry &&
                        formik.errors.motherPrevCountry
                      }
                    >
                      {COUNTRIES.map((val) => {
                        return <MenuItem value={val.name}>{val.name}</MenuItem>;
                      })}
                    </TextField>
                  </Grid>
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
                Other details
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
                      select
                      id="martialStatus"
                      name="martialStatus"
                      label="Applicant's Martial Status"
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
                    >
                      {["MARRIED", "SINGLE", "DIVORCEE"].map((val) => {
                        return (
                          <MenuItem value={val} key={val}>
                            {val}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  {formik.values.martialStatus === "MARRIED" ? (
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
                          id="spouseName"
                          name="spouseName"
                          label="Spouse Name"
                          onChange={formik.handleChange}
                          value={formik.values.spouseName}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spouseName &&
                            Boolean(formik.errors.spouseName)
                          }
                          helperText={
                            formik.touched.spouseName &&
                            formik.errors.spouseName
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
                          select
                          id="spouseNation"
                          name="spouseNation"
                          label="Spouse's Nationality"
                          onChange={formik.handleChange}
                          value={formik.values.spouseNation}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spouseNation &&
                            Boolean(formik.errors.spouseNation)
                          }
                          helperText={
                            formik.touched.spouseNation &&
                            formik.errors.spouseNation
                          }
                        >
                          {COUNTRIES.map((val) => {
                            return (
                              <MenuItem value={val.name}>{val.name}</MenuItem>
                            );
                          })}
                        </TextField>
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
                          id="spousePrevNation"
                          name="spousePrevNation"
                          label="Spouse's Previous Nationality"
                          onChange={formik.handleChange}
                          value={formik.values.spousePrevNation}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spousePrevNation &&
                            Boolean(formik.errors.spousePrevNation)
                          }
                          helperText={
                            formik.touched.spousePrevNation &&
                            formik.errors.spousePrevNation
                          }
                        >
                          {COUNTRIES.map((val) => {
                            return (
                              <MenuItem value={val.name}>{val.name}</MenuItem>
                            );
                          })}
                        </TextField>
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
                          id="spousePlace"
                          name="spousePlace"
                          label="Spouse's place of birth"
                          onChange={formik.handleChange}
                          value={formik.values.spousePlace}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spousePlace &&
                            Boolean(formik.errors.spousePlace)
                          }
                          helperText={
                            formik.touched.spousePlace &&
                            formik.errors.spousePlace
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
                          select
                          fullWidth
                          id="spouseCountry"
                          name="spouseCountry"
                          label="Spouse Country/Region of birth"
                          onChange={formik.handleChange}
                          value={formik.values.spouseCountry}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spouseCountry &&
                            Boolean(formik.errors.spouseCountry)
                          }
                          helperText={
                            formik.touched.spouseCountry &&
                            formik.errors.spouseCountry
                          }
                        >
                          {COUNTRIES.map((val) => {
                            return (
                              <MenuItem value={val.name}>{val.name}</MenuItem>
                            );
                          })}
                        </TextField>
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
                          id="spouseOccupation"
                          name="spouseOccupation"
                          label="Spouse Occupation"
                          onChange={formik.handleChange}
                          value={formik.values.spouseOccupation}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spouseOccupation &&
                            Boolean(formik.errors.spouseOccupation)
                          }
                          helperText={
                            formik.touched.spouseOccupation &&
                            formik.errors.spouseOccupation
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
                          id="spouseAddress"
                          name="spouseAddress"
                          label="Spouse Address"
                          onChange={formik.handleChange}
                          value={formik.values.mark}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.mark && Boolean(formik.errors.mark)
                          }
                          helperText={formik.touched.mark && formik.errors.mark}
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
                          id="spousePhone"
                          name="spousePhone"
                          label="Spouse Phone number"
                          onChange={formik.handleChange}
                          value={formik.values.spousePhone}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.spousePhone &&
                            Boolean(formik.errors.spousePhone)
                          }
                          helperText={
                            formik.touched.spousePhone &&
                            formik.errors.spousePhone
                          }
                        />
                      </Grid>
                    </>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Are/were you in a Military/Semi-Military/Police/Security.
                      Organization?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="yesDefence"
                        id="check1"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.noDefence &&
                            !formik.values.yesDefence
                          ) {
                            formik.setFieldValue("noDefence", false);
                            formik.setFieldValue("yesDefence", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="noDefence"
                        id="check1"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.yesDefence &&
                            !formik.values.noDefence
                          ) {
                            formik.setFieldValue("noDefence", true);
                            formik.setFieldValue("yesDefence", false);
                            formik.setFieldValue("defenceOrganization", "");
                            formik.setFieldValue("defenceDesignation", "");
                            formik.setFieldValue("defenceRank", "");
                            formik.setFieldValue("defencePosting", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>

                  {formik.values.yesDefence ? (
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
                          id="defenceOrganization"
                          name="defenceOrganization"
                          label="Organization"
                          onChange={formik.handleChange}
                          value={formik.values.defenceOrganization}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.defenceOrganization &&
                            Boolean(formik.errors.defenceOrganization)
                          }
                          helperText={
                            formik.touched.defenceOrganization &&
                            formik.errors.defenceOrganization
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
                          id="defenceDesignation"
                          name="defenceDesignation"
                          label="Designation"
                          onChange={formik.handleChange}
                          value={formik.values.defenceDesignation}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.defenceDesignation &&
                            Boolean(formik.errors.defenceDesignation)
                          }
                          helperText={
                            formik.touched.defenceDesignation &&
                            formik.errors.defenceDesignation
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
                          id="defenceRank"
                          name="defenceRank"
                          label="Rank"
                          onChange={formik.handleChange}
                          value={formik.values.defenceRank}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.defenceRank &&
                            Boolean(formik.errors.defenceRank)
                          }
                          helperText={
                            formik.touched.defenceRank &&
                            formik.errors.defenceRank
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
                          id="defencePosting"
                          name="defencePosting"
                          label="Place of Posting"
                          onChange={formik.handleChange}
                          value={formik.values.defencePosting}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.defencePosting &&
                            Boolean(formik.errors.defencePosting)
                          }
                          helperText={
                            formik.touched.defencePosting &&
                            formik.errors.defencePosting
                          }
                        />
                      </Grid>
                    </>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>Have you ever visited India before?</span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="yesVisitedIndia"
                        id="check2"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.noVisitedIndia &&
                            !formik.values.yesVisitedIndia
                          ) {
                            formik.setFieldValue("noVisitedIndia", false);
                            formik.setFieldValue("yesVisitedIndia", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="noVisitedIndia"
                        id="check2"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.yesVisitedIndia &&
                            !formik.values.noVisitedIndia
                          ) {
                            formik.setFieldValue("noVisitedIndia", true);
                            formik.setFieldValue("yesVisitedIndia", false);
                            formik.setFieldValue("street", "");
                            formik.setFieldValue("village", "");
                            formik.setFieldValue("addresscountry", "");
                            formik.setFieldValue("state", "");
                            formik.setFieldValue("postal", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.yesVisitedIndia ? (
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
                          id="viAddress"
                          name="viAddress"
                          label="Address"
                          onChange={formik.handleChange}
                          value={formik.values.viAddress}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viAddress &&
                            Boolean(formik.errors.viAddress)
                          }
                          helperText={
                            formik.touched.viAddress && formik.errors.viAddress
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
                          id="viPreviousCity"
                          name="viPreviousCity"
                          label="Cities previously visited in India"
                          onChange={formik.handleChange}
                          value={formik.values.viPreviousCity}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viPreviousCity &&
                            Boolean(formik.errors.viPreviousCity)
                          }
                          helperText={
                            formik.touched.viPreviousCity &&
                            formik.errors.viPreviousCity
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
                          id="viCountry"
                          name="viCountry"
                          label="Last Indian Visa Number/Country valid Visa number"
                          onChange={formik.handleChange}
                          value={formik.values.viCountry}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viCountry &&
                            Boolean(formik.errors.viCountry)
                          }
                          helperText={
                            formik.touched.viCountry && formik.errors.viCountry
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
                          id="viVisa"
                          name="viVisa"
                          label="Type of Visa"
                          onChange={formik.handleChange}
                          value={formik.values.viVisa}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viVisa &&
                            Boolean(formik.errors.viVisa)
                          }
                          helperText={
                            formik.touched.viVisa && formik.errors.viVisa
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
                          id="viPlaceIssue"
                          name="viPlaceIssue"
                          label="Place of Issue"
                          onChange={formik.handleChange}
                          value={formik.values.viPlaceIssue}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viPlaceIssue &&
                            Boolean(formik.errors.viPlaceIssue)
                          }
                          helperText={
                            formik.touched.viPlaceIssue &&
                            formik.errors.viPlaceIssue
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
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          id="viDateIssue"
                          name="viDateIssue"
                          type="date"
                          label="Date of Issue"
                          onChange={formik.handleChange}
                          value={formik.values.viDateIssue}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.viDateIssue &&
                            Boolean(formik.errors.viDateIssue)
                          }
                          helperText={
                            formik.touched.viDateIssue &&
                            formik.errors.viDateIssue
                          }
                        />
                      </Grid>
                    </>
                  ) : null}
                  <Grid container item xs={12} md={8}>
                    <span>
                      Has permission to visit or to extend stay in India
                      previously been refused?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="yesExtended"
                        id="check3"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.noExtended &&
                            !formik.values.yesExtended
                          ) {
                            formik.setFieldValue("noExtended", false);
                            formik.setFieldValue("yesExtended", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="noExtended"
                        id="check3"
                        label="Check the mark"
                        onChange={() => {
                          if (
                            formik.values.yesExtended &&
                            !formik.values.noExtended
                          ) {
                            formik.setFieldValue("noExtended", true);
                            formik.setFieldValue("yesExtended", false);
                            formik.setFieldValue("extendedControlNo", false);
                            formik.setFieldValue("extendedDate", false);
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>

                  {formik.values.yesExtended ? (
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
                          id="extendedControlNo"
                          name="extendedControlNo"
                          label="Control number"
                          onChange={formik.handleChange}
                          value={formik.values.extendedControlNo}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.extendedControlNo &&
                            Boolean(formik.errors.extendedControlNo)
                          }
                          helperText={
                            formik.touched.extendedControlNo &&
                            formik.errors.extendedControlNo
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
                          id="extendedDate"
                          name="extendedDate"
                          label="Cities previously visited in India"
                          onChange={formik.handleChange}
                          value={formik.values.extendedDate}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.extendedDate &&
                            Boolean(formik.errors.extendedDate)
                          }
                          helperText={
                            formik.touched.extendedDate &&
                            formik.errors.extendedDate
                          }
                        />
                      </Grid>
                    </>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you ever been arrested/ prosecuted/ convicted by
                      Court of Law of any country?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q1Yes"
                        id="Q1"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q1No && !formik.values.Q1Yes) {
                            formik.setFieldValue("Q1No", false);
                            formik.setFieldValue("Q1Yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q1No"
                        id="Q1"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q1Yes && !formik.values.Q1No) {
                            formik.setFieldValue("Q1No", true);
                            formik.setFieldValue("Q1Yes", false);
                            formik.setFieldValue("Q1Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.Q1Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q1Detail"
                        name="Q1Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q1Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q1Detail &&
                          Boolean(formik.errors.Q1Detail)
                        }
                        helperText={
                          formik.touched.Q1Detail && formik.errors.extendedDate
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you ever been refused entry / deported by any country
                      including India?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q2Yes"
                        id="Q2"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q2No && !formik.values.Q2Yes) {
                            formik.setFieldValue("Q2No", false);
                            formik.setFieldValue("Q2Yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q2No"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q2Yes && !formik.values.Q2No) {
                            formik.setFieldValue("Q2No", true);
                            formik.setFieldValue("Q2Yes", false);
                            formik.setFieldValue("Q2Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>

                  {formik.values.Q2Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q2Detail"
                        name="Q2Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q2Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q2Detail &&
                          Boolean(formik.errors.Q2Detail)
                        }
                        helperText={
                          formik.touched.Q2Detail && formik.errors.Q2Detail
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you ever been engaged in Human trafficking/ Drug
                      trafficking/ Child abuse/ Crime against women/ Economic
                      offense / Financial fraud?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q3Yes"
                        id="Q3"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q3No && !formik.values.Q3Yes) {
                            formik.setFieldValue("Q3No", false);
                            formik.setFieldValue("Q3Yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q3No"
                        id="Q3"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q3Yes && !formik.values.Q3No) {
                            formik.setFieldValue("Q3No", true);
                            formik.setFieldValue("Q3Yes", false);
                            formik.setFieldValue("Q3Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>

                  {formik.values.Q3Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q3Detail"
                        name="Q3Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q3Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q3Detail &&
                          Boolean(formik.errors.Q3Detail)
                        }
                        helperText={
                          formik.touched.Q3Detail && formik.errors.Q3Detail
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you ever been engaged in Cyber crime/ Terrorist
                      activities/ Sabotage/ Espionage/ Genocide/ Political
                      killing/ other act of violence?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q4Yes"
                        id="Q4"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q4No && !formik.values.Q4Yes) {
                            formik.setFieldValue("Q4No", false);
                            formik.setFieldValue("Q4Yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q4No"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q4Yes && !formik.values.Q4No) {
                            formik.setFieldValue("Q4No", true);
                            formik.setFieldValue("Q4Yes", false);
                            formik.setFieldValue("Q4Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.Q4Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q4Detail"
                        name="Q4Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q4Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q4Detail &&
                          Boolean(formik.errors.Q4Detail)
                        }
                        helperText={
                          formik.touched.Q4Detail && formik.errors.Q4Detail
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you ever by any means or medium, expressed views that
                      justify or glorify terrorist violence or that may
                      encourage others to terrorist acts or other serious
                      criminal acts?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q5Yes"
                        id="Q5"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q5No && !formik.values.Q5Yes) {
                            formik.setFieldValue("Q5No", false);
                            formik.setFieldValue("Q5Yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q5No"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q5Yes && !formik.values.Q5No) {
                            formik.setFieldValue("Q5No", true);
                            formik.setFieldValue("Q5Yes", false);
                            formik.setFieldValue("Q5Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.Q5Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q5Detail"
                        name="Q5Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q5Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q5Detail &&
                          Boolean(formik.errors.Q5Detail)
                        }
                        helperText={
                          formik.touched.Q5Detail && formik.errors.Q5Detail
                        }
                      />
                    </Grid>
                  ) : null}

<Grid container item xs={12} md={8}>
                    <span>
                     Were your Parents/Grandparents (paternal/maternal) Pakistan Nationals or Belong to Pakistan held area.
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q7yes"
                        id="Q5"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q7No && !formik.values.Q7yes) {
                            formik.setFieldValue("Q7No", false);
                            formik.setFieldValue("Q7yes", true);
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q7No"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q7yes && !formik.values.Q7No) {
                            formik.setFieldValue("Q7No", true);
                            formik.setFieldValue("Q7yes", false);
                            formik.setFieldValue("Q7Detail", "");
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.Q7yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q7Detail"
                        name="Q7Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q7Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q7Detail &&
                          Boolean(formik.errors.Q7Detail)
                        }
                        helperText={
                          formik.touched.Q7Detail && formik.errors.Q7Detail
                        }
                      />
                    </Grid>
                  ) : null}
                  <Grid container item xs={12} md={8}>
                    <span>
                      Have you sought asylum (political or otherwise)in any
                      country?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label>
                      <Field
                        type="checkbox"
                        name="Q6Yes"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q6No && !formik.values.Q6Yes) {
                            formik.setFieldValue("Q6No", false);
                            formik.setFieldValue("Q6Yes", true);
                            formik.setFieldValue("Q5Detail", "");
                          }
                        }}
                      />
                      Yes
                    </label>
                    &nbsp; &nbsp; &nbsp;
                    <label>
                      <Field
                        type="checkbox"
                        name="Q6No"
                        id="check"
                        label="Check the mark"
                        onChange={() => {
                          if (formik.values.Q6Yes && !formik.values.Q6No) {
                            formik.setFieldValue("Q6No", true);
                            formik.setFieldValue("Q6Yes", false);
                          }
                        }}
                      />
                      No
                    </label>
                  </Grid>
                  {formik.values.Q6Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputProps={{
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q6Detail"
                        name="Q6Detail"
                        label="Please enter details"
                        onChange={formik.handleChange}
                        value={formik.values.Q6Detail}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.Q6Detail &&
                          Boolean(formik.errors.Q6Detail)
                        }
                        helperText={
                          formik.touched.Q6Detail && formik.errors.Q6Detail
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>
                      Choose the Photo To Upload (Applicant's recent colored
                      photograph)
                      <br></br>
                      <b>
                        *Please upload an image with a maximum file size of 5MB,
                        in JPEG or PNG format
                      </b>
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input
                      id="applicantFile"
                      name="applicantFile"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "applicantFile",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </Grid>

                  <Grid container item xs={12} md={8}>
                    <span>
                      Choose the Passport To Upload (Copy of Passport page
                      containing personal particulars)
                      <br></br>
                      <b>
                        *Please upload an image with a maximum file size of 5MB,
                        in JPEG or PNG format
                      </b>
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input
                      id="passportFile"
                      name="passportFile"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "passportFile",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
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
