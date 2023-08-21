import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useRef } from 'react'
import Card from "@mui/material/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import * as yup from "yup";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Question from "@mui/icons-material/QuestionMarkRounded";
import { Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import axios from "axios";



const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter your Family name").required("Family Name is required"),
  firstName: yup
    .string("Enter your FirstName")
    .required("First name is required"),
  nationality: yup
    .string("Enter your nationality")
    .required("Nationality is required"),
  portOfArrival: yup
    .string("Enter your Port of arrival")
    .required("Port of arrival is required"),
  dob: yup.string("Enter your Date of Birth").required("Date of Birth is required"),
  phoneNumber: yup
    .string("Enter your Phone number")
    .required("Phone number is required"),
  EDOA: yup
    .string("Enter your expected date of Arrival")
    .required("Expected date of Arrival is required"),
  visaService: yup
    .string("Enter your Visa service")
    .required("Visa service is required"),
    visaOptions: yup
    .string("Enter your Visa Option")
});

export default function StepperOne() {
  const theme = useTheme();

  const [toggle, setToggle] = React.useState({
    name: false,
    firstName: false,
    nationality: "",
    portOfArrival: "",
    dob: "",
    email: "",
    phoneNumber: "",
    EDOA: "",
    visaService: "",
    visaOptions: [],
  });


  const map = {
    "eTOURIST VISA": [
      "eTourist Visa(for 30 Days)",
      "eTourist Visa(for 1 Year)",
      "eTourist Visa(for 5 Years)",
    ],
    "eMEDICAL VISA": [],
    "eBUSINESS VISA": [
      "TO SET UP INDUSTRIAL/BUSINESS VENTURE",
      "SALE/PURCHASE/TRADE",
      "ATTEND TECHNICAL/BUSINESS MEETINGS",
      "TO RECRUIT MANPOWER",
      "PARTICIPATION IN EXHIBITIONS, BUSINESS/TRADE FAIRS",
      "EXPERT/SPECIALIST IN CONNECTION WITH AN ONGOING PROJECT",
      "CONDUCTING TOURS",
      "TO DELIVER LECTURE/S UNDER GLOBAL INITIATIVE FOR ACADEMIC NETWORKS (GIAN)",
      "PLI/SPECS/EMC 2.0 SCHEME",
      "SPORTS RELATED ACTIVITY",
      "TO JOIN THE VESSEL",
    ],
    "eCONFERENCE VISA": [],
    "eMEDICAL ATTENDANT VISA": [],
    "G20 eConference VISA": [],
  };

  
  const formik = useFormik({
    initialValues: {
      name: "",
      firstName: "",
      nationality: "",
      portOfArrival: "",
      dob: "",
      email: "",
      phoneNumber: "",
      EDOA: "",
      visaService: "",
      visaOptions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await axios.post("http://localhost:8081/create", values);
      console.log(response);
    },
  });

  const inputRef = useRef()
  const inputRef2 = useRef()

  return (
    <Card>
      <CardHeader
        style={{
          backgroundColor: "#1a75ff",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          padding: "6px",
        }}
      >
        Personal Details
      </CardHeader>
      <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container columnSpacing={8} rowSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="question-button"
                        onClick={() =>
                          setToggle({ ...toggle, name: !toggle.name })
                        }
                      >
                        <Question
                          id="question-icon"
                          sx={{ stroke: "#ffffff", strokeWidth: 1 }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="name"
                name="name"
                label="Surname/Family Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <div className="info-div">
                <Info id="info-icon" />
                <span style={{ marginLeft: "3px" }}>
                  Enter your Surname exactly as shown in your passport
                </span>
              </div>
              {toggle.name ? (
                <div className="extra-details">
                  <span>
                    Family name is also known as Last name or Surname. Enter ALL
                    name(s) as they appear on your passport.
                  </span>
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() =>
                        setToggle({ ...toggle, firstName: !toggle.firstName })
                      }
                    >
                      <IconButton id="question-button">
                        <Question
                          id="question-icon"
                          sx={{ stroke: "#ffffff", strokeWidth: 1 }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="firstName"
                name="firstName"
                label="First/Given Names"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <div className="info-div">
                <Info id="info-icon" />
                <span style={{ marginLeft: "3px" }}>
                  Enter your First and Middle Name as shown in your passport
                </span>
              </div>
              {toggle.firstName ? (
                <div className="extra-details">
                  <span>
                    Please provide your first name(s) (also known as "given
                    name") exactly as shown on your passport or identity
                    document.
                  </span>
                </div>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="nationality"
                name="nationality"
                label="Nationality"
                onChange={formik.handleChange}
                value={formik.values.nationality}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nationality &&
                  Boolean(formik.errors.nationality)
                }
                helperText={
                  formik.touched.nationality && formik.errors.nationality
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="portOfArrival"
                name="portOfArrival"
                label="Port Of Arrival"
                type="portOfArrival"
                onChange={formik.handleChange}
                value={formik.values.portOfArrival}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.portOfArrival &&
                  Boolean(formik.errors.portOfArrival)
                }
                helperText={
                  formik.touched.portOfArrival && formik.errors.portOfArrival
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="dob"
                name="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={formik.handleChange}
                value={formik.values.dob}
                inputRef={inputRef}
                onClick={() => {
                  inputRef.current.showPicker()
                }} 
                onBlur={formik.handleBlur}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email id"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="reEmail"
                name="reEmail"
                label="Re-Enter Email"
                type="reEmail"
                onChange={formik.handleChange}
                value={formik.values.reEmail}
                onBlur={formik.handleBlur}
                error={formik.touched.reEmail && Boolean(formik.errors.reEmail)}
                helperText={formik.touched.reEmail && formik.errors.reEmail}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone  Number"
                type="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="password"
                name="EDOA"
                label="Expected date of Arrival"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={formik.handleChange}
                value={formik.values.EDOA}
                inputRef={inputRef2}
                onClick={() => {
                  inputRef2.current.showPicker()
                }} 
                onBlur={formik.handleBlur}
                error={formik.touched.EDOA && Boolean(formik.errors.EDOA)}
                helperText={formik.touched.EDOA && formik.errors.EDOA}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="visaService"
                name="visaService"
                label="Visa Service"
                select
                onChange={formik.handleChange}
                value={formik.values.visaService}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.visaService &&
                  Boolean(formik.errors.visaService)
                }
                helperText={
                  formik.touched.visaService && formik.errors.visaService
                }
              >
                {Object.keys(map)?.map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            {map[formik.values.visaService] &&
            map[formik.values.visaService].length !== 0 ? (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="visaOptions"
                  name="visaOptions"
                  label="Visa Options"
                  type="visaOptions"
                  onChange={formik.handleChange}
                  select
                  value={formik.values.visaOptions}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.visaOptions &&
                    Boolean(formik.errors.visaOptions)
                  }
                  helperText={
                    formik.touched.visaOptions && formik.errors.visaOptions
                  }
                >
                  {map[formik.values.visaService].map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            ) : null}
          </Grid>
          <div className="next-button">
            <Button type="submit" variant="contained" color="success">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
