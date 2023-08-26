import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";
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
import Spinner from "../utils/Spinner";
import Notification from "../utils/Notification";
import { COUNTRIES } from "../utils/Countries";
import Captcha from "./Captcha";
import { MonthMap } from "../utils/MonthMap";
import { AIRPORTS } from "../utils/Countries";
import { useParams } from "react-router-dom";
import PassportDetails from "./Steppers/StepOne/PassportDetails";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  reEmail: yup
    .string("Enter your email")
    .email("Should match the email")
    .required("Email is required"),
  name: yup
    .string("Enter your Family name")
    .required("Family Name is required"),
  firstName: yup
    .string("Enter your FirstName")
    .required("First name is required"),
  nationality: yup
    .string("Enter your nationality")
    .required("Nationality is required"),
  portOfArrival: yup
    .string("Enter your Port of arrival")
    .required("Port of arrival is required"),
  dob: yup
    .string("Enter your Date of Birth")
    .required("Date of Birth is required"),
  mobileCode: yup
    .string("Enter your Mobile code")
    .required("Mobile code is required"),
  phoneNumber: yup
    .string("Enter your Phone number")
    .required("Phone number is required"),
  EDOA: yup
    .string("Enter your expected date of Arrival")
    .required("Expected date of Arrival is required"),
  visaService: yup
    .string("Enter your Visa service")
    .required("Visa service is required"),
  visaOptions: yup.string("Enter your Visa Option"),
});

export default function StepperOne() {
  const [toggle, setToggle] = React.useState({
    name: false,
    firstName: false,
  });

  const [formValues, setFormValues] = React.useState();

  const [loader, setLoader] = React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    content: "",
  });
  const [hideButton, setHideButton] = React.useState(false);
  const [tempId, setTempId] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    fetch();

    async function fetch() {
      try {
        const response = await axios.get(`https://evisa-backend.vercel.app/tempId/${id}`);
        console.log("responsee", response.data.Result);
        if (response.data.Result?.length >= 1) {
          setFormValues(response.data.Result[0]);
          setHideButton(true);
        } else {
          setHideButton(false);
        }
      } catch (error) {}
    }
  }, []);
  console.log("form", formValues);

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

  console.log("formValues?.dob", formValues);

  const formik = useFormik({
    initialValues: {
      name: formValues?.name || "",
      firstName: formValues?.firstName || "",
      nationality: formValues?.nationality || "",
      portOfArrival: formValues?.portOfArrival || "",
      dob: formValues?.dob.split("T")[0] || "",
      email: formValues?.email || "",
      reEmail: formValues?.email || "",
      phoneNumber: formValues?.phoneNumber || "",
      EDOA: formValues?.edoa.split("T")[0] || "",
      visaService: formValues?.visaService || "",
      visaOptions: formValues?.visaOptions || "",
      mobileCode: formValues?.mobileCode || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axios.post(
          "https://evisa-backend.vercel.app/create",
          values
        );
        if (response.data.message === "Success") {
          setHideButton(true);
          setTempId(response.data.tempId)
        }
      } catch (error) {
        setLoader(false);
        setNotification({ ...notification, open: true, content: "Error!" });
      }
      setLoader(false);
    },
  });

  const setOpen = () => {
    setNotification({ ...notification, open: false, content: "" });
  };

  const handleCP = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef();
  const inputRef2 = useRef();

  return (
    <>
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
        {
          <Notification
            open={notification.open}
            content={notification.content}
            handleClose={setOpen}
          ></Notification>
        }
        <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: "30px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={8} rowSpacing={4}>
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
                      Family name is also known as Last name or Surname. Enter
                      ALL name(s) as they appear on your passport.
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
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
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
                  select
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
                >
                  {COUNTRIES.map((val) => {
                    return (
                      <MenuItem value={val.name} key={val.name}>
                        {val.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="portOfArrival"
                  name="portOfArrival"
                  label="Port Of Arrival"
                  type="portOfArrival"
                  select
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
                    inputRef.current.showPicker();
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
                {new Date(formik.values.dob).getDate() ? (
                  <div style={{ fontWeight: "bold", marginTop: "6px" }}>
                    {new Date(formik.values.dob).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.dob).getMonth()] +
                      "-" +
                      new Date(formik.values.dob).getFullYear()}
                  </div>
                ) : null}
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
                  onCut={handleCP}
                  onCopy={handleCP}
                  onPaste={handleCP}
                  type="reEmail"
                  onChange={formik.handleChange}
                  value={formik.values.reEmail}
                  onBlur={formik.handleBlur}
                  error={formik.values.email !== formik.values.reEmail}
                  helperText={
                    formik.values.email !== formik.values.reEmail
                      ? "Enter same email"
                      : ""
                  }
                />
              </Grid>

              <Grid container item xs={4} md={2}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                  label="Select code"
                  name="mobileCode"
                  onChange={formik.handleChange}
                  value={formik.values.mobileCode}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mobileCode &&
                    Boolean(formik.errors.mobileCode)
                  }
                  helperText={
                    formik.touched.mobileCode && formik.errors.mobileCode
                  }
                >
                  {COUNTRIES.map((val) => {
                    return (
                      <MenuItem key={val.mobileCode} value={val.mobileCode}>
                        {val.mobileCode}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid container item xs={8} md={4} columnSpacing={6}>
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
                    inputRef2.current.showPicker();
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.EDOA && Boolean(formik.errors.EDOA)}
                  helperText={formik.touched.EDOA && formik.errors.EDOA}
                />
                {new Date(formik.values.EDOA).getDate() ? (
                  <div style={{ fontWeight: "bold", marginTop: "6px" }}>
                    {new Date(formik.values.EDOA).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.EDOA).getMonth()] +
                      "-" +
                      new Date(formik.values.EDOA).getFullYear()}
                  </div>
                ) : null}
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
              <Grid item xs={12} md={12}>
                <Captcha />
              </Grid>
            </Grid>
            {!hideButton ? (
              <div className="next-button">
                <Button type="submit" variant="contained" color="success">
                  Next
                </Button>
              </div>
            ) : null}
          </form>
          {loader && <Spinner></Spinner>}
        </CardContent>
      </Card>
      {hideButton ? <PassportDetails tempId={tempId} formValue={formik.values} /> : null}
    </>
  );
}
