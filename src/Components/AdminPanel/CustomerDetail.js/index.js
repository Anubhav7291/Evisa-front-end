import { Button, Container, Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useLocation } from "react-router-dom";
import "../../../style.css";
import { MonthMap } from "../../../utils/MonthMap";
import Spinner from "../../../utils/Spinner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Page, pdfjs } from "react-pdf";
import generatePDF from "react-to-pdf";
import { Done } from "@mui/icons-material";
import { Link } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function CustomerDetail(props) {
  const [loader, setLoader] = React.useState(false);
  const [ApplicantImageUrl, setApplicantImageUrl] = useState("");
  const [PassportImageUrl, setPassportImageUrl] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [result, setResult] = useState([]);
  const location = useLocation();
  const id = localStorage.getItem("id");

  const pdfRef = React.useRef();

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + `/getLeadbyId/${id}`
      );
      if (res.data.message === "Success") {
        setResult(res.data.data[0]);
        const base64String = arrayBufferToBase64(
          res.data.data[0].applicantFile?.data
        );
        const dataUrl = `data:image/jpeg;base64,${base64String}`;
        setApplicantImageUrl(dataUrl);

        const base64String1 = arrayBufferToBase64(
          res.data.data[0].passportFile?.data
        );
        const dataUrl1 = `data:image/jpeg;base64,${base64String1}`;
        console.log(dataUrl1);
        setPassportImageUrl(dataUrl1);

        const base64String2 = arrayBufferToBase64(
          res.data.data[0].businessFile?.data
        );
        const dataUrl2 = `data:image/jpeg;base64,${base64String2}`;
        setBusinessUrl(dataUrl2);
      }
    };
    fetchApi();
  }, []);
  console.log("res", businessUrl);
  const formik = useFormik({
    initialValues: {
      firstName: result.firstName,
      name: result?.name || "",
      nationality: result?.nationality || "",
      portOfArrival: result?.portOfArrival || "",
      dob: result?.dob?.split("T")[0] || "",
      email: result?.email || "",
      reEmail: result?.email || "",
      phoneNumber: result?.phoneNumber || "",
      EDOA: result?.edoa?.split("T")[0] || "",
      visaService: result?.visaService || "",
      visaOptions: result?.visaOptions || "",
      mobileCode: result?.mobileCode || "",
      city: result.city,
      country: result.country,
      citizenship: result.citizenship,
      religion: result.religion,
      mark: result.mark,
      qualification: result.qualification,
      passportNumber: result.passportNumber,
      issueDate: result.issueDate,
      expiryDate: result.expiryDate,
      IssueCountry: result.IssueCountry,
      otherPassportNumber: result.otherPassportNumber,
      otherDateOfIssue: result.otherDateOfIssue,
      otherPlaceIssue: result.otherPlaceIssue,
      otherNationality: result.otherNationality,
      street: result.street,
      village: result.village,
      addresscountry: result.addresscountry,
      state: result.state,
      postal: result.postal,
      fatherName: result.fatherName,
      fatherNation: result.fatherNation,
      fatherBirth: result.fatherBirth,
      fatherCountry: result.fatherCountry,
      motherName: result.motherName,
      motherNation: result.motherNation,
      motherBirth: result.motherBirth,
      motherCountry: result.motherCountry,
      martialStatus: result.martialStatus,
      spouseName: result.spouseName,
      spouseNation: result.spouseNation,
      spouseAddress: result.spouseAddress,
      spousePlace: result.spousePlace,
      spouseCountry: result.spouseCountry,
      spouseOccupation: result.spouseOccupation,
      spousePhone: result.spousePhone,
      yesDefence:
        result.defenceOrganization ||
        result.defenceDesignation ||
        result.defenceRank
          ? true
          : false,
      defenceOrganization: result.defenceOrganization,
      defenceDesignation: result.defenceDesignation,
      defenceRank: result.defenceRank,
      defencePosting: result.defencePosting,
      yesVisitedIndia: result.viAddress ? true : false,
      viAddress: result.viAddress,
      viPreviousCity: result.viPreviousCity,
      viCountry: result.viCountry,
      viVisa: result.viVisa,
      viPlaceIssue: result.viPlaceIssue,
      viDateIssue: result.viDateIssue,
      yesExtended: result.extendedControlNo ? true : false,
      extendedControlNo: result.extendedControlNo,
      extendedDate: result.extendedDate,
      Q1Yes: result.Q1Detail ? true : false,
      Q1Detail: result.Q1Detail,
      Q2Yes: result.Q2Detail ? true : false,
      Q2Detail: result.Q2Detail,
      Q3Yes: result.Q3Detail ? true : false,
      Q3Detail: result.Q3Detail,
      Q4Yes: result.Q4Detail ? true : false,
      Q4Detail: result.Q4Detail,
      Q5Yes: result.Q5Detail ? true : false,
      Q5Detail: result.Q5Detail,
      Q6Yes: result.Q6Detail ? true : false,
      Q6Detail: result.Q6Detail,
      Q7Yes: result.Q7Detail ? true : false,
      Q7Detail: result.Q7Detail,
      applicantFile: result.applicantFile,
      passportFile: result.passportFile,
      ip: result.ip,
      Aoccupation: result.Aoccupation,
      employerAddress: result.employerAddress,
      employerName: result.employerName,
      FI_address: result.FI_address,
      FI_phone: result.FI_phone,
      FI_referencename: result.FI_referencename,
      FO_address: result.FO_address,
      FO_phone: result.FO_phone,
      FO_referencename: result.FO_referencename,
      AB_address: result.AB_address,
      AB_name: result.AB_name,
      AB_phone: result.AB_phone,
      AB_website: result.AB_website,
      IB_address: result.IB_address,
      IB_name: result.IB_name,
      eTourist: result?.eTourist,
      IB_phone: result?.IB_phone,
      IB_website: result?.IB_website,
      businessFile: result?.businessFile,
    },
    enableReinitialize: true,
    //validationSchema: validationSchema,
  });

  const downloadFile = () => {
    const input = pdfRef.current;
    const zoomFactor = 2;
    const fontSize = 16; // Ad
    const contentStyles = {
      fontSize: `${fontSize}px`,
    };
    input.style.fontSize = `${fontSize}px`;
    html2canvas(input, { scale: zoomFactor }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), 300);
      pdf.save("downloaded-component.pdf");
    });
  };

  const handleLinkClick = (event, id, downloadButton) => {
    // Prevent the default navigation behavior
    event.preventDefault();

    // Open a new tab
    const newTab = window.open(event.target.href, "_blank");

    newTab.document.write("<html><head><title>Image</title></head><body>");
    newTab.document.write('<img src="' + id + '" alt="Image">');
    newTab.document.write("</body></html>");
  };

  return (
    <Container
      fixed
      style={{ fontFamily: "sans-serif", marginTop: "17px", fontSize: "14px" }}
    >
      <Card ref={pdfRef}>
        <h3 style={{ textAlign: "center" }}>
          Application Number ({id}) Complete Details
        </h3>
        <div style={{ textAlign: "right", marginRight: "10px" }}>
          {localStorage.getItem("downloadButton") === "true" ? (
            <Button
              variant="contained"
              onClick={() => generatePDF(pdfRef, { filename: "page.pdf" })}
            >
              Download PDF
            </Button>
          ) : null}
        </div>
        <div style={{ marginLeft: "23%", textAlign: "justify" }}>
          {ApplicantImageUrl.split(",")[1] &&
          result.typeApplicant !== "application/pdf" ? (
            <>
              <img src={ApplicantImageUrl} height={"300px"} width={"300px"} />
            </>
          ) : (
            <Document file={ApplicantImageUrl}>
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                customTextRenderer={false}
                pageNumber={1}
              />
            </Document>
          )}
          <Link
            to="/customerDetail"
            onClick={(e) => handleLinkClick(e, ApplicantImageUrl)}
          >
            Photo
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {PassportImageUrl.split(",")[1] &&
          result.typePassport !== "application/pdf" ? (
            <>
              <img src={PassportImageUrl} height={"300px"} width={"300px"} />
            </>
          ) : (
            <Document file={ApplicantImageUrl}>
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                customTextRenderer={false}
                pageNumber={1}
              />{" "}
            </Document>
          )}
          <Link
            style={{ textAlign: "center", left: 0 }}
            to="/customerDetail"
            onClick={(e) => handleLinkClick(e, PassportImageUrl)}
          >
            Passport
          </Link>
          {businessUrl.split(",")[1] &&
          result.typeBussiness !== "application/pdf" ? (
            <>
              <img src={businessUrl} height={"300px"} width={"300px"} />
            </>
          ) : (
            <Document file={businessUrl}>
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                customTextRenderer={false}
                pageNumber={1}
              />{" "}
            </Document>
          )}
          <Link
            style={{ textAlign: "center", left: 0 }}
            to="/customerDetail"
            onClick={(e) => handleLinkClick(e, businessUrl)}
          >
            Business card
          </Link>
          <span style={{ left: 0 }}></span>
        </div>
        <CardHeader
          style={{
            marginLeft: "1%",
            fontWeight: "bold",
            fontSize: "16px",
            padding: "12px",
          }}
        >
          Personal Details
        </CardHeader>
        <FormikProvider value={formik}>
          <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: "30px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container columnSpacing={8} rowSpacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
                    id="firstName"
                    name="firstName"
                    label="First/Given Names"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
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
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
                    fullWidth
                    id="nationality"
                    name="nationality"
                    label="Nationality"
                    onChange={formik.handleChange}
                    value={formik.values.nationality}
                    onBlur={formik.handleBlur}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
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
                      formik.touched.portOfArrival &&
                      formik.errors.portOfArrival
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                      readOnly: true,
                    }}
                    fullWidth
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    onChange={formik.handleChange}
                    value={
                      new Date(formik.values.dob).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.dob).getMonth()] +
                      "-" +
                      new Date(formik.values.dob).getFullYear()
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                      readOnly: true,
                    }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                      readOnly: true,
                    }}
                    fullWidth
                    id="reEmail"
                    name="reEmail"
                    label="Re-Enter Email"
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                      readOnly: true,
                    }}
                    fullWidth
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
                  />
                </Grid>

                <Grid container item xs={8} md={4} columnSpacing={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                      readOnly: true,
                    }}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
                    fullWidth
                    id="password"
                    name="EDOA"
                    label="Expected date of Arrival"
                    onChange={formik.handleChange}
                    value={
                      new Date(formik.values.EDOA).getDate() +
                      "-" +
                      MonthMap[new Date(formik.values.EDOA).getMonth()] +
                      "-" +
                      new Date(formik.values.EDOA).getFullYear()
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.EDOA && Boolean(formik.errors.EDOA)}
                    helperText={formik.touched.EDOA && formik.errors.EDOA}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      readOnly: true,
                      style: {
                        height: "50px",
                        fontSize: "15px",
                      },
                    }}
                    fullWidth
                    id="visaService"
                    name="visaService"
                    label="Visa Service"
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
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                    InputProps={{
                      style: {
                        height: "50px",
                        fontSize: "12px",
                      },
                      readOnly: true,
                    }}
                    fullWidth
                    id="visaOptions"
                    name="visaOptions"
                    label="Visa Options"
                    type="visaOptions"
                    onChange={formik.handleChange}
                    value={formik.values.visaOptions}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.visaOptions &&
                      Boolean(formik.errors.visaOptions)
                    }
                    helperText={
                      formik.touched.visaOptions && formik.errors.visaOptions
                    }
                  ></TextField>
                </Grid>

                {result?.eTourist ? (
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "12px",
                        },
                      }}
                      fullWidth
                      label="eTourist Option"
                      id="eTourist"
                      name="eTourist"
                      onChange={formik.handleChange}
                      value={formik.values.eTourist}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.eTourist &&
                        Boolean(formik.errors.eTourist)
                      }
                      helperText={
                        formik.touched.eTourist && formik.errors.eTourist
                      }
                    />
                  </Grid>
                ) : null}
              </Grid>
            </form>
            {loader && <Spinner></Spinner>}
          </CardContent>

          <CardHeader
            style={{
              margin: "1%",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            Contact and Passport Details
          </CardHeader>

          <CardContent sx={{ flex: "1 0 auto" }} style={{ padding: "30px" }}>
            <Grid container columnSpacing={8} rowSpacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
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
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
                  id="passportNumber"
                  name="passportNumber"
                  label="Passport Number"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
                  id="issueDate"
                  name="issueDate"
                  label="Date of Issue"
                  onChange={formik.handleChange}
                  value={
                    new Date(formik.values.issueDate).getDate() +
                    "-" +
                    MonthMap[new Date(formik.values.issueDate).getMonth()] +
                    "-" +
                    new Date(formik.values.issueDate).getFullYear()
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.issueDate && Boolean(formik.errors.issueDate)
                  }
                  helperText={
                    formik.touched.issueDate && formik.errors.issueDate
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                    style: {
                      height: "50px",
                      fontSize: "15px",
                    },
                  }}
                  fullWidth
                  id="expiryDate"
                  name="expiryDate"
                  label="Date of Expiry"
                  onChange={formik.handleChange}
                  value={
                    new Date(formik.values.expiryDate).getDate() +
                    "-" +
                    MonthMap[new Date(formik.values.expiryDate).getMonth()] +
                    "-" +
                    new Date(formik.values.expiryDate).getFullYear()
                  }
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate)
                  }
                  helperText={
                    formik.touched.expiryDate && formik.errors.expiryDate
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
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
                    formik.touched.IssueCountry && formik.errors.IssueCountry
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
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
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  InputProps={{
                    readOnly: true,
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
            </Grid>
          </CardContent>

          <CardHeader
            style={{
              marginLeft: "1%",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "10px",
            }}
          >
            Address
          </CardHeader>

          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <CardContent
                sx={{ flex: "1 0 auto" }}
                style={{ padding: "30px" }}
              >
                <Grid container columnSpacing={8} rowSpacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
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
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
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
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
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
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardHeader
                style={{
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
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
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
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
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardHeader
                style={{
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
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
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
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
                      marginLeft: "1%",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
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
                            readOnly: true,
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          variant="standard"
                          fullWidth
                          id="AB_name"
                          name="AB_name"
                          label="Name"
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
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                      marginLeft: "1%",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "10px",
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
                          variant="standard"
                          InputProps={{
                            readOnly: true,
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="IB_Name"
                          name="IB_Name"
                          label="Name"
                          onChange={formik.handleChange}
                          value={formik.values.IB_Name}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.IB_Name &&
                            Boolean(formik.errors.IB_Name)
                          }
                          helperText={
                            formik.touched.IB_Name && formik.errors.IB_Name
                          }
                        ></TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                          variant="standard"
                          InputProps={{
                            style: {
                              readOnly: true,
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
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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

              <CardHeader
                style={{
                  marginLeft: "1%",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "10px",
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: {
                          height: "50px",
                          fontSize: "15px",
                        },
                      }}
                      fullWidth
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
                    />
                  </Grid>

                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
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
                          formik.touched.spouseName && formik.errors.spouseName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
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
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
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
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
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

                  <Grid container item xs={12} md={8}>
                    <span>
                      Are/were you in a Military/Semi-Military/Police/Security.
                      Organization?
                    </span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {formik.values.yesDefence ? "Yes" : "No"}
                  </Grid>

                  {formik.values.yesDefence ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                    </>
                  ) : null}

                  <Grid container item xs={12} md={8}>
                    <span>Have you ever visited India before?</span>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    {formik.values.yesVisitedIndia ? "Yes" : "No"}
                  </Grid>
                  {formik.values.yesVisitedIndia ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
                            style: {
                              height: "50px",
                              fontSize: "15px",
                            },
                          }}
                          fullWidth
                          id="viDateIssue"
                          name="viDateIssue"
                          type="date"
                          label="Date of Issue"
                          onChange={formik.handleChange}
                          value={formik.values.viDateIssue}
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
                    {formik.values.yesExtended ? "Yes" : "No"}
                  </Grid>

                  {formik.values.yesExtended ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          InputProps={{
                            readOnly: true,
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
                    {formik.values.Q1Yes ? "Yes" : "No"}
                  </Grid>
                  {formik.values.Q1Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q1Detail"
                        name="Q1Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q1Detail}
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
                    {formik.values.Q2Yes ? "Yes" : "No"}
                  </Grid>

                  {formik.values.Q2Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q2Detail"
                        name="Q2Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q2Detail}
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
                    {formik.values.Q3Yes ? "Yes" : "No"}
                  </Grid>

                  {formik.values.Q3Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q3Detail"
                        name="Q3Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q3Detail}
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
                    {formik.values.Q4Yes ? "Yes" : "No"}
                  </Grid>
                  {formik.values.Q4Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q4Detail"
                        name="Q4Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q4Detail}
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
                    {formik.values.Q5Yes ? "Yes" : "No"}
                  </Grid>
                  {formik.values.Q5Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q5Detail"
                        name="Q5Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q5Detail}
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
                    {formik.values.Q6Yes ? "Yes" : "No"}
                  </Grid>
                  {formik.values.Q6Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q6Detail"
                        name="Q6Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q6Detail}
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
                    {formik.values.Q7Yes ? "Yes" : "No"}
                  </Grid>
                  {formik.values.Q7Yes ? (
                    <Grid item xs={12} md={6}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                          style: {
                            height: "50px",
                            fontSize: "15px",
                          },
                        }}
                        fullWidth
                        id="Q7Detail"
                        name="Q7Detail"
                        onChange={formik.handleChange}
                        value={formik.values.Q7Detail}
                      />
                    </Grid>
                  ) : null}
                  <Grid
                    container
                    style={{ marginTop: "3%", fontWeight: "bold" }}
                    item
                    xs={12}
                    md={7}
                  >
                    <span>
                      I have read and agree to the Privacy Policy, Term and
                      conditions & Refund Policy
                    </span>
                  </Grid>
                  <Grid style={{ marginTop: "3%" }} item xs={12} md={5}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        fontWeight: "bold",
                      }}
                    >
                      <Done style={{ color: "green" }} />
                      <span>Agreed IP:- {formik.values.ip}</span>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </FormikProvider>
        </FormikProvider>
      </Card>
    </Container>
  );
}
