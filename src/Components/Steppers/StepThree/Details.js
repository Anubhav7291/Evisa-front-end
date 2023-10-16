import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Field, FormikProvider, useFormik, ErrorMessage } from "formik";
import * as React from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate, useParams } from "react-router-dom";
import "../../../style.css";
import { COUNTRIES, EDUCATION, RELIGION } from "../../../utils/Countries";
import { EMPLOYMENT } from "../../../utils/District";
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
import * as yup from "yup";

const validationSchema = yup.object({
  passportFile: yup
    .string("Please upload Passport")
    .required("Please upload Passport"),
  applicantFile: yup
    .string("Please upload the photo")
    .required("Please upload the photo"),
  street: yup
    .string("Enter your Street mark")
    .required("Street mark is required"),
  village: yup
    .string("Enter your Village mark")
    .required("Village mark is required"),
  addresscountry: yup
    .string("Enter your Country mark")
    .required("Country mark is required"),
  fatherBirth: yup
    .string("Enter your Father birth mark")
    .required("Father birth mark is required"),
  fatherName: yup
    .string("Enter your Father name mark")
    .required("Father name mark is required"),
  fatherCountry: yup
    .string("Enter your Father country mark")
    .required("Father country mark is required"),
  fatherNation: yup
    .string("Enter your Father nation mark")
    .required("Father nation mark is required"),
  motherBirth: yup
    .string("Enter your Mother nation mark")
    .required("Mother nation mark is required"),
  motherCountry: yup
    .string("Enter your Verification mark")
    .required("Verification mark is required"),
  motherName: yup
    .string("Enter your Mother name mark")
    .required("Mother name mark is required"),
  motherNation: yup
    .string("Enter your Mother nation mark")
    .required("Mother nation mark is required"),
  employerName: yup
    .string("Enter your Emplyer Name mark")
    .required("Emplyer Name mark is required"),
  employerAddress: yup
    .string("Enter your Employer address mark")
    .required("Employer address mark is required"),
  F_placetoVisited: yup
    .string("Enter your Address mark")
    .required("Address mark is required"),
  FI_referencename: yup
    .string("Enter your Reference Name mark")
    .required("Reference Name mark is required"),
  FI_address: yup
    .string("Enter your Address mark")
    .required("Address mark is required"),
  FI_phone: yup
    .string("Enter your Phone mark")
    .required("Phone mark is required"),
  FO_referencename: yup
    .string("Enter your Name mark")
    .required("Name mark is required"),
  AB_address: yup
    .string("Enter your Address mark")
    .required("Address mark is required"),
  AB_phone: yup
    .string("Enter your Phone mark")
    .required("Phone mark is required"),
  AB_website: yup
    .string("Enter your Website mark")
    .required("Website mark is required"),
  IB_name: yup.string("Enter your Name mark").required("Name mark is required"),
  IB_address: yup
    .string("Enter your Address mark")
    .required("Address mark is required"),
  IB_phone: yup
    .string("Enter your Phone mark")
    .required("Phone mark is required"),
  IB_website: yup
    .string("Enter your Website mark")
    .required("Website mark is required"),
  martialStatus: yup
    .string("Enter your Martial Status mark")
    .required("Martial Status mark is required"),
  postal: yup
    .string("Enter your Postal mark")
    .required("Postal mark is required"),
  state: yup.string("Enter your State mark").required("State mark is required"),
  Aoccupation: yup
    .string("Enter your Occupation mark")
    .required("Occupation mark is required"),
  FO_phone: yup
    .string("Enter your Phone mark")
    .required("Phone mark is required"),
  FO_address: yup
    .string("Enter your Address mark")
    .required("Address mark is required"),
});

export default function Details(props) {
  const theme = useTheme();
  const location = useLocation();
  const tempId = location?.state?.tempId;
  console.log(location?.state);
  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [image, setImage] = React.useState([]);
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
      Aoccupation: "",
      employerAddress: "",
      employerName: "",
      FI_address: "",
      F_placetoVisited: "",
      FI_phone: "",
      FI_referencename: "",
      FO_address: "",
      FO_phone: "",
      FO_referencename: "",
      AB_address: "",
      AB_name: "",
      AB_phone: "",
      AB_website: "",
      IB_address: "",
      IB_name: "",
      IB_phone: "",
      IB_website: "",
      businessFile: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      console.log(values);

      formData.append("typeBusiness", values.businessFile.type);
      formData.append("typeApplicant", values.applicantFile.type);
      formData.append("typePassport", values.passportFile.type);
      formData.append("id", id);
      formData.append("village", values.village);
      formData.append("street", values.street);

      formData.append("addresscountry", values.addresscountry);
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
      // formData.append("applicantFile", values.applicantFile); // You can append files here if needed
      // formData.append("passportFile",values.passportFile);
      formData.append("Aoccupation", values.Aoccupation);
      formData.append("Q7Detail", values.Q7Detail);
      formData.append("employerAddress", values.employerAddress);
      formData.append("employerName", values.employerName);
      formData.append("F_placetoVisited", values.F_placetoVisited);
      formData.append("FI_address", values.FI_address);
      formData.append("FI_phone", values.FI_phone);
      formData.append("FI_referencename", values.FI_referencename);
      formData.append("FO_address", values.FO_address);
      formData.append("FO_phone", values.FO_phone);
      formData.append("FO_referencename", values.FO_referencename);
      formData.append("AB_address", values.AB_address);
      formData.append("AB_name", values.AB_name);
      formData.append("AB_phone", values.AB_phone);
      formData.append("AB_website", values.AB_website);
      formData.append("IB_address", values.IB_address);
      formData.append("IB_name", values.IB_name);
      formData.append("IB_phone", values.IB_phone);
      formData.append("IB_website", values.IB_website);
      // formData.append("businessFile",values.businessFile);
      formData.append("email", result?.email);
      formData.append("name", result?.name);
      formData.append("firstName", result?.firstName);

      setLoader(true);

      try {
        const s3Urlapplicant = await axios.get(
          process.env.REACT_APP_BASE_URL + "/s3Url"
        );

        if (s3Urlapplicant.data.url) {
          const res = await fetch(s3Urlapplicant.data.url, {
            method: "PUT",
            headers: {
              "Content-Type": values.applicantFile.type,
            },
            body: values.applicantFile,
          });
          formData.append(
            "applicantFile",
            s3Urlapplicant.data.url.split("?")[0]
          );
        }

        const s3Urlpassport = await axios.get(
          process.env.REACT_APP_BASE_URL + "/s3Url"
        );
        if (s3Urlpassport.data.url) {
          const res = await fetch(s3Urlpassport.data.url, {
            method: "PUT",
            headers: {
              "Content-Type": values.passportFile.type,
            },
            body: values.passportFile,
          });
          formData.append("passportFile", s3Urlpassport.data.url.split("?")[0]);
        }

        const s3business = await axios.get(
          process.env.REACT_APP_BASE_URL + "/s3Url"
        );
        if (s3business.data.url && values.businessFile) {
          const res = await fetch(s3business.data.url, {
            method: "PUT",
            headers: {
              "Content-Type": values.businessFile.type,
            },
            body: values.businessFile,
          });
          formData.append("businessFile", s3business.data.url.split("?")[0]);
        }

        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + `/otherDetails`,
          formData
        );
        if (response.data.message === "Success") {
          navigate("/application-form/finalStep", {
            state: { tempId: tempId },
          });
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
    const fetchApi = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + `/getLeadbyId/${id}`
      );
      if (res.data.message === "Success") {
        setResult(res.data.data[0]);
      }
    };
    fetchApi();
  }, []);

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
        <img src={image} />
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
                    </>
                  ) : null}
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
                Applicant's Occupation
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
                      select
                      fullWidth
                      id="Aoccupation"
                      name="Aoccupation"
                      label="Occupation"
                      onChange={formik.handleChange}
                      value={formik.values.Aoccupation}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Aoccupation &&
                        Boolean(formik.errors.Aoccupation)
                      }
                      helperText={
                        formik.touched.Aoccupation && formik.errors.Aoccupation
                      }
                    >
                      {EMPLOYMENT.map((val) => {
                        return (
                          <MenuItem value={val} key={val}>
                            {val}
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
                      id="employerName"
                      name="employerName"
                      label="Employer Name"
                      onChange={formik.handleChange}
                      value={formik.values.employerName}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employerName &&
                        Boolean(formik.errors.employerName)
                      }
                      helperText={
                        formik.touched.employerName &&
                        formik.errors.employerName
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
                      id="employerAddress"
                      name="employerAddress"
                      label="Employer Address"
                      onChange={formik.handleChange}
                      value={formik.values.employerAddress}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.employerAddress &&
                        Boolean(formik.errors.employerAddress)
                      }
                      helperText={
                        formik.touched.employerAddress &&
                        formik.errors.employerAddress
                      }
                    />
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
                Details of Visa Sought
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
                Reference in India
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
                      id="FI_referencename"
                      name="FI_referencename"
                      label="Name"
                      onChange={formik.handleChange}
                      value={formik.values.FI_referencename}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FI_referencename &&
                        Boolean(formik.errors.FI_referencename)
                      }
                      helperText={
                        formik.touched.FI_referencename &&
                        formik.errors.FI_referencename
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
                      id="FI_address"
                      name="FI_address"
                      label="Address"
                      onChange={formik.handleChange}
                      value={formik.values.FI_address}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FI_address &&
                        Boolean(formik.errors.FI_address)
                      }
                      helperText={
                        formik.touched.FI_address && formik.errors.FI_address
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
                      id="FI_phone"
                      name="FI_phone"
                      label="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.FI_phone}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FI_phone &&
                        Boolean(formik.errors.FI_phone)
                      }
                      helperText={
                        formik.touched.FI_phone && formik.errors.FI_phone
                      }
                    ></TextField>
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
                Reference in {result?.nationality}
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
                      id="FO_referencename"
                      name="FO_referencename"
                      label="Name"
                      onChange={formik.handleChange}
                      value={formik.values.FO_referencename}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FO_referencename &&
                        Boolean(formik.errors.FO_referencename)
                      }
                      helperText={
                        formik.touched.FO_referencename &&
                        formik.errors.FO_referencename
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
                      id="FO_address"
                      name="FO_address"
                      label="Address"
                      onChange={formik.handleChange}
                      value={formik.values.FO_address}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FO_address &&
                        Boolean(formik.errors.FO_address)
                      }
                      helperText={
                        formik.touched.FO_address && formik.errors.FO_address
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
                      id="FO_phone"
                      name="FO_phone"
                      label="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.FO_phone}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.FO_phone &&
                        Boolean(formik.errors.FO_phone)
                      }
                      helperText={
                        formik.touched.FO_phone && formik.errors.FO_phone
                      }
                    ></TextField>
                  </Grid>
                </Grid>
              </CardContent>

              {result?.visaService === "eBUSINESS VISA" ? (
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
                    Details of Applicant Business
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
                          id="AB_name"
                          name="AB_name"
                          label="Company Name"
                          onChange={formik.handleChange}
                          value={formik.values.AB_name}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.AB_name &&
                            Boolean(formik.errors.AB_name)
                          }
                          helperText={
                            formik.touched.FO_referencename &&
                            formik.errors.FO_referencename
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
                          id="AB_address"
                          name="AB_address"
                          label="Address"
                          onChange={formik.handleChange}
                          value={formik.values.AB_address}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.AB_address &&
                            Boolean(formik.errors.AB_address)
                          }
                          helperText={
                            formik.touched.AB_address &&
                            formik.errors.AB_address
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
                          id="AB_phone"
                          name="AB_phone"
                          label="Phone"
                          onChange={formik.handleChange}
                          value={formik.values.AB_phone}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.AB_phone &&
                            Boolean(formik.errors.AB_phone)
                          }
                          helperText={
                            formik.touched.AB_phone && formik.errors.AB_phone
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
                          id="AB_website"
                          name="AB_website"
                          label="Website"
                          onChange={formik.handleChange}
                          value={formik.values.AB_website}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.AB_website &&
                            Boolean(formik.errors.AB_website)
                          }
                          helperText={
                            formik.touched.AB_website &&
                            formik.errors.AB_website
                          }
                        ></TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                </>
              ) : null}

              {result?.visaService === "eBUSINESS VISA" &&
              result?.visaOptions === "ATTEND TECHNICAL/BUSINESS MEETINGS" ? (
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
                    Detail of Indian Company
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
                          id="IB_name"
                          name="IB_name"
                          label="Name"
                          onChange={formik.handleChange}
                          value={formik.values.IB_name}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.IB_name &&
                            Boolean(formik.errors.IB_name)
                          }
                          helperText={
                            formik.touched.IB_name && formik.errors.IB_name
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
                          id="IB_address"
                          name="IB_address"
                          label="Address"
                          onChange={formik.handleChange}
                          value={formik.values.IB_address}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.IB_address &&
                            Boolean(formik.errors.IB_address)
                          }
                          helperText={
                            formik.touched.IB_address &&
                            formik.errors.IB_address
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
                          id="IB_phone"
                          name="IB_phone"
                          label="Phone"
                          onChange={formik.handleChange}
                          value={formik.values.IB_phone}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.IB_phone &&
                            Boolean(formik.errors.IB_phone)
                          }
                          helperText={
                            formik.touched.IB_phone && formik.errors.IB_phone
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
                          id="IB_website"
                          name="IB_website"
                          label="Website"
                          onChange={formik.handleChange}
                          value={formik.values.IB_website}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.IB_website &&
                            Boolean(formik.errors.IB_website)
                          }
                          helperText={
                            formik.touched.IB_website &&
                            formik.errors.IB_website
                          }
                        ></TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                </>
              ) : null}

              <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
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
                      Were your Parents/Grandparents (paternal/maternal)
                      Pakistan Nationals or Belong to Pakistan held area.
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
                        in JPEG, PNG or PDF format
                      </b>
                    </span>
                    <ErrorMessage name="applicantFile">
                      {(msg) => <div style={{ color: "red", marginTop:"10px", marginLeft:"5px"}}>{msg}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input
                      id="applicantFile"
                      name="applicantFile"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "applicantFile",
                          event.target.files[0]
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
                        in JPEG, PNG or PDF format
                      </b>
                    </span>
                    <ErrorMessage name="passportFile">
                      {(msg) => <div style={{ color: "red", marginTop:"10px", marginLeft:"5px"}}>{msg}</div>}
                    </ErrorMessage>
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

                  {result?.visaService === "eBUSINESS VISA" ? (
                    <>
                      <Grid container item xs={12} md={8}>
                        <span>
                          Choose the Business Card To Upload
                          <br></br>
                          <b>
                            *Please upload an image with a maximum file size of
                            5MB, in JPEG, PNG or PDF format
                          </b>
                        </span>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <input
                          id="businessFile"
                          name="businessFile"
                          type="file"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "businessFile",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </Grid>
                    </>
                  ) : null}
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
