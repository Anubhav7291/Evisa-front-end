import { Button, Grid, MenuItem, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import * as React from "react";
import { useRef } from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { COUNTRIES, EDUCATION, RELIGION } from "../../../utils/Countries";
import { MonthMap } from "../../../utils/MonthMap";
import Notification from "../../../utils/Notification";
import Spinner from "../../../utils/Spinner";
import "../../../style.css";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  city: yup.string("Enter your city"),
  country: yup.string("Enter your country"),
  citizenship: yup.string("Enter your citizenship"),
  religion: yup
    .string("Enter your religion")
    .required("Religion name is required"),
  mark: yup
    .string("Enter your Verification mark")
    .required("Verification mark is required"),
  qualification: yup
    .string("Enter your Port of qualification")
    .required("Qualification is required"),
  passportNumber: yup
    .string("Enter your Passport Number")
    .required("Passport Number is required"),
  issueDate: yup
    .string("Enter your Issue Date")
    .required("Issue Date is required"),
  expiryDate: yup
    .string("Enter your expected Expiry Date")
    .required("Expiry Date is required"),
  IssueCountry: yup.string("Enter your Issue Country"),
  otherPassportNumber: yup.string("Enter your Passport Number"),

  otherDateOfIssue: yup.string("Enter your Date Of Issue"),
  otherPlaceIssue: yup.string("Enter your Place Issue"),
  otherNationality: yup.string("Enter your Nationality"),
});

export default function PassportDetails({ formValue, tempId }) {
  const theme = useTheme();

  const navigate = useNavigate();

  const [loader, setLoader] = React.useState(false);
  const [notification, setNotification] = React.useState({
    open: false,
    content: "",
  });
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      city: "",
      yes: false,
      no: true,
      country: "",
      citizenship: "",
      religion: "",
      mark: "",
      qualification: "",
      passportNumber: "",
      issueDate: "",
      expiryDate: "",
      IssueCountry: "",
      otherPassportNumber: "",
      otherDateOfIssue: "",
      otherPlaceIssue: "",
      otherNationality: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        formValue.passportDetails = values;
        let paramId;
        if (tempId) {
          paramId = tempId;
        } else {
          paramId = id;
        }
        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + `/update/${paramId}`,
          formValue
        );
        if (response.data.message === "Success") {
          navigate("/payment", { state: { tempId: paramId } });
        }
      } catch (error) {}
      setLoader(false);
    },
    handleChange: () => {
      console.log("claal");
    },
  });
  const currentDate = new Date();
  const dobDate = new Date(currentDate);
  dobDate.setDate(currentDate.getDate() - 1);

  const expiry = new Date(currentDate);
  expiry.setDate(currentDate.getDate() - 180);


  const setOpen = () => {
    setNotification({ ...notification, open: false, content: "" });
  };


  const handleCP = (e) => {
    e.preventDefault();
  };

  const inputRef = useRef();
  const inputRef2 = useRef();

  return (
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
        Contact and Passport Details
      </CardHeader>
      {
        <Notification
          open={notification.open}
          content={notification.content}
          handleClose={setOpen}
        ></Notification>
      }
      <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: "30px" }}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
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
                  id="city"
                  name="city"
                  label="Province/Town/City of birth"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
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
                  id="country"
                  name="country"
                  label="Country/Region of birth"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                >
                  {COUNTRIES.map((val) => {
                    return <MenuItem value={val.name}>{val.name}</MenuItem>;
                  })}
                </TextField>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <TextField 
                InputProps={{
                  style: {
                      height: "50px",
                      fontSize: "15px",
                    }}}
                  fullWidth
                  id="citizenship"
                  name="citizenship"
                  label="Citizenship"
                  onChange={formik.handleChange}
                  value={formik.values.citizenship}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.citizenship &&
                    Boolean(formik.errors.citizenship)
                  }
                  helperText={
                    formik.touched.citizenship && formik.errors.citizenship
                  }
                />
              </Grid> */}

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
                  id="religion"
                  name="religion"
                  label="Religion"
                  type="religion"
                  onChange={formik.handleChange}
                  value={formik.values.religion}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.religion && Boolean(formik.errors.religion)
                  }
                  helperText={formik.touched.religion && formik.errors.religion}
                >
                  {RELIGION.map((val) => {
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  id="mark"
                  name="mark"
                  label="Visible identification marks"
                  placeholder="Birth mark, mole, tattoo, none"
                  onChange={formik.handleChange}
                  value={formik.values.mark}
                  onBlur={formik.handleBlur}
                  error={formik.touched.mark && Boolean(formik.errors.mark)}
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
                  select
                  id="qualification"
                  name="qualification"
                  label="Educational Qualification"
                  onChange={formik.handleChange}
                  value={formik.values.qualification}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.qualification &&
                    Boolean(formik.errors.qualification)
                  }
                  helperText={
                    formik.touched.qualification && formik.errors.qualification
                  }
                >
                  {EDUCATION.map((val) => {
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
                  id="passportNumber"
                  name="passportNumber"
                  label="Passport Number"
                  onCut={handleCP}
                  onCopy={handleCP}
                  onPaste={handleCP}
                  type="passportNumber"
                  onChange={formik.handleChange}
                  value={formik.values.passportNumber}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.passportNumber &&
                    Boolean(formik.errors.passportNumber)
                  }
                  helperText={
                    formik.touched.passportNumber &&
                    formik.errors.passportNumber
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
                  id="issueDate"
                  name="issueDate"
                  label="Date of Issue"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    // only needs the first 16 characters in the date string
                    max: dobDate.toISOString().slice(0, 10),
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.issueDate}
                  inputRef={inputRef2}
                  onClick={() => {
                    inputRef2.current.showPicker();
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.issueDate && Boolean(formik.errors.issueDate)
                  }
                  helperText={
                    formik.touched.issueDate && formik.errors.issueDate
                  }
                />
                {new Date(formik.values.issueDate).getDate() ? (
                  <div style={{ fontWeight: "bold", marginTop: "6px" }}>
                    {new Date(formik.values.issueDate).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.issueDate).getMonth()] +
                      "-" +
                      new Date(formik.values.issueDate).getFullYear()}
                  </div>
                ) : null}
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
                  id="expiryDate"
                  name="expiryDate"
                  label="Date of Expiry"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    // only needs the first 16 characters in the date string
                    max: expiry.toISOString().slice(0, 10),
                  }}
                  inputRef={inputRef}
                  onClick={() => {
                    inputRef.current.showPicker();
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.expiryDate}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate)
                  }
                  helperText={
                    formik.touched.expiryDate && formik.errors.expiryDate
                  }
                />
                {new Date(formik.values.expiryDate).getDate() ? (
                  <div style={{ fontWeight: "bold", marginTop: "6px" }}>
                    {new Date(formik.values.expiryDate).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.expiryDate).getMonth()] +
                      "-" +
                      new Date(formik.values.expiryDate).getFullYear()}
                  </div>
                ) : null}
              </Grid>

              <Grid container item xs={12} md={8}>
                <span>
                  Any other valid Passport/Identity Certificate(IC) held
                </span>
              </Grid>
              <Grid item xs={12} md={4}>
                <label>
                  <Field
                    type="checkbox"
                    name="yes"
                    id="check"
                    label="Check the mark"
                    onChange={() => {
                      if (formik.values.no && !formik.values.yes) {
                        formik.setFieldValue("no", false);
                        formik.setFieldValue("yes", true);
                      }
                    }}
                  />
                  Yes
                </label>
                &nbsp; &nbsp; &nbsp;
                <label>
                  <Field
                    type="checkbox"
                    name="no"
                    id="check"
                    label="Check the mark"
                    onChange={() => {
                      if (formik.values.yes && !formik.values.no) {
                        formik.setFieldValue("no", true);
                        formik.setFieldValue("yes", false);
                      }
                    }}
                  />
                  No
                </label>
              </Grid>
              {formik.values.yes ? (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      id="IssueCountry"
                      name="IssueCountry"
                      label="Country Issue"
                      type="IssueCountry"
                      onChange={formik.handleChange}
                      value={formik.values.IssueCountry}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.IssueCountry &&
                        Boolean(formik.errors.IssueCountry)
                      }
                      helperText={
                        formik.touched.IssueCountry &&
                        formik.errors.IssueCountry
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      id="otherPassportNumber"
                      name="otherPassportNumber"
                      label="Passport/IC No."
                      type="otherPassportNumber"
                      onChange={formik.handleChange}
                      value={formik.values.otherPassportNumber}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.otherPassportNumber &&
                        Boolean(formik.errors.otherPassportNumber)
                      }
                      helperText={
                        formik.touched.otherPassportNumber &&
                        formik.errors.otherPassportNumber
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      id="otherDateOfIssue"
                      name="otherDateOfIssue"
                      label="Date of Issue"
                      type="otherDateOfIssue"
                      onChange={formik.handleChange}
                      value={formik.values.otherDateOfIssue}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.otherDateOfIssue &&
                        Boolean(formik.errors.otherDateOfIssue)
                      }
                      helperText={
                        formik.touched.otherDateOfIssue &&
                        formik.errors.otherDateOfIssue
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      id="otherPlaceIssue"
                      name="otherPlaceIssue"
                      label="Place of Issue"
                      type="otherPlaceIssue"
                      onChange={formik.handleChange}
                      value={formik.values.otherPlaceIssue}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.otherPlaceIssue &&
                        Boolean(formik.errors.otherPlaceIssue)
                      }
                      helperText={
                        formik.touched.otherPlaceIssue &&
                        formik.errors.otherPlaceIssue
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputProps={{
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      id="otherNationality"
                      name="otherNationality"
                      label="Nationality mentioned therein"
                      type="otherNationality"
                      onChange={formik.handleChange}
                      value={formik.values.otherNationality}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.otherNationality &&
                        Boolean(formik.errors.otherNationality)
                      }
                      helperText={
                        formik.touched.otherNationality &&
                        formik.errors.otherNationality
                      }
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <div className="next-button">
              <Button type="submit" variant="contained" color="success">
                Continue
              </Button>
            </div>
          </form>
        </FormikProvider>
        {loader && <Spinner></Spinner>}
      </CardContent>
    </Card>
  );
}
