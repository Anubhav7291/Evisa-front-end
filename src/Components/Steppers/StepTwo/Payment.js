import React from "react";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Container,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  CardElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Spinner from "../../../utils/Spinner";
import ImageSecure from "../../../assets/100-percent-secure.jpg";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";
import SSLIMAGE from "../../../assets/seal-secured-ssl.png";
import VisaImage from "../../../assets/visapic.svg";
import AMEXImage from "../../../assets/american_express.svg";
import JCBImage from "../../../assets/jcb.svg";
import MAESTROImage from "../../../assets/maestro.svg";
import MCImage from "../../../assets/mastercard.svg";
import UPAY from "../../../assets/union-pay.svg";



function Payment(props) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    expiryYear: "",
    cvv: "",
    price: 1,
  });
  const [formvalues, setFormValues] = useState();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const tempId = location?.state?.tempId;

  let map = {
    "eTourist Visa(for 30 Days)": "99",
    "eTourist Visa(for 1 Year)": "149",
    "eTourist Visa(for 5 Years)": "249",
    "eBUSINESS VISA": "249",
    "eMEDICAL ATTENDANT VISA": "249",
    "eMEDICAL VISA": "249",
    "eCONFERENCE VISA":"249",
    "G20 eConference VISA":"249"
  };

  useEffect(() => {
    const navdom = document.querySelector("#Step-payment");
    navdom.style.backgroundColor = "#1a75ff";
    navdom.style.color = "white";

    fetch();
    async function fetch() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
        );

        if (response.data.data?.length >= 1) {
          setFormValues(response.data.data[0]);
        } else {
        }
      } catch (error) {}
    }
  }, []);

  const years = Array.from(
    { length: new Date().getFullYear() - 1969 },
    (_, index) => 1970 + index
  );

  const dates = Array.from({ length: 12 }, (_, index) => index + 1);

  const handleClick = async () => {
   
    setLoading(true)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
     const totalAmount = formvalues?.visaService === "eTOURIST VISA"
      ? 
        map[formvalues?.visaOptions]
      : 
        map[formvalues?.visaService]
    
      try {
         const { id } = paymentMethod;
        const response = await axios.post(process.env.REACT_APP_BASE_URL + `/checkout`, {
          amount: totalAmount * 100,
          id: id,
          name:formvalues.firstName,
          sirName: formvalues.name,
          email:formvalues.email,
          tempId:tempId,
          ip:formvalues.ip
        });
        if (response.data.success) {
          setSuccess(true);
          setLoading(false)
          navigate(`/details/${tempId}`, { state: { tempId: tempId } });
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    } else {
      setLoading(false)
      console.log(error.message);
    }
  };
  //navigate("/details", { state: { tempId: tempId } });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
            Pay Now
          </CardHeader>
          <CardContent
            sx={{ flex: "1 0 auto" }}
            style={{ padding: "30px", backgroundColor: "#d6d6c2" }}
          >
            <Grid container spacing={4} justifyContent="left">
              <Grid item xs={12} sm={8} md={8}>
                <Card>
                  <CardHeader
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "6px",
                    }}
                  >
                    Secure Payment
                  </CardHeader>
                  <CardContent
                    sx={{ flex: "1 0 auto" }}
                    style={{ padding: "30px" }}
                  >
                    <div>
                      <b>Note:-</b> Please eneter the exact details which are
                      associated with your payment card (debit/credit) in the
                      form given below. Otherwise, there will be higher chances
                      of payment failure
                    </div>
                    <Grid container xs={12} sm={8} md={12}>
                      <TextField
                        fullWidth
                        label="Name of Card"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                      />
                      <Grid style={{ border: "1px solid #d1d1d1", padding: "12px",
                                lineHeight:"40px"}} item xs={12}>
                        
                        <CardElement
                        
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                border: "1px solid #d1d1d1",
                                padding: "12px",
                                lineHeight:"40px"
                              },
                            },
                          }}
                        />
                        {loading && <Spinner></Spinner>}
                       
                      </Grid>
                      {/* <Grid container item xs={12} sm={4} md={3}>
                        <TextField
                          select
                          label="Expiration Month"
                          name="expirationDate"
                          value={formData.expirationDate}
                          fullWidth
                          onChange={handleInputChange}
                          required
                          margin="normal"
                        >
                          {dates.map((date) => (
                            <MenuItem key={date} value={date}>
                              {date}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Grid container item xs={12} sm={4} md={4}>
                        <TextField
                          select
                          fullWidth
                          label="EXPIRY YEAR"
                          name="expiryYear"
                          value={formData.expiryYear}
                          onChange={handleInputChange}
                          required
                          margin="normal"
                        >
                          {years.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Grid container item xs={12} sm={4} md={4}>
                        <TextField
                          label="CVV Code"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          margin="normal"
                        />
                      </Grid> */}
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                      style={{ marginTop: "20px" }}
                      onClick={() => handleClick()}
                    >
                      Pay Now
                    </Button>

                    <div style={{ marginTop: "15px" }}>
                      A review of your file will start once payment is
                      successful. You will receive an email which will contain
                      your India eVisa approval confirmation by the Indian
                      Immigration Authorities. The eVisa is an entry requirement
                      to be able to travel to India by air. Once your eVisa is
                      approved, it will be delievered to your email and linked
                      to your passport
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <img src={ImageSecure} height="90px" width="180px" />
                <div style={{ fontWeight: "bold", marginTop: "15px" }}>
                  ORDER SUMMARY
                </div>
                <div style={{ marginTop: "8px" }}>
                  First/Given Names: {formvalues?.firstName}
                </div>
                <div style={{ marginTop: "9px" }}>
                  Passport Number: {formvalues?.passportNumber}
                </div>
                <div style={{ fontWeight: "bold", marginTop: "8px" }}>
                  Processing Time
                </div>
                <div style={{ marginTop: "8px" }}>
                  Standard processing time 24-48 hrs, in some cases it may 72
                  hrs.
                </div>
                <div style={{ fontWeight: "bold", marginTop: "8px" }}>
                  Email
                </div>
                <div style={{ marginTop: "8px" }}>
                  Please check your junk/spam folder in case if you didn't find
                  email in your inbox.
                </div>
                <div style={{ marginTop: "8px", fontWeight: "bold" }}>
                  Payment
                </div>
                <div style={{ marginTop: "8px" }}>
                  Total amount:{" "}
                  {formvalues?.visaService === "eTOURIST VISA"
                    ? formvalues?.visaOptions +
                      " - " +
                      map[formvalues?.visaOptions] +" USD"
                    : formvalues?.visaService +
                      " - " +
                      map[formvalues?.visaService]+" USD"}
                </div>

                <p style={{ marginTop: "20px" }}>
                  This Transaction will appear on your card statement as India Evisa Services
                </p>
                <Divider />

                <div style={{ fontFamily: "sans-serif", marginTop: "10px" }}>
                  <b>Important:-</b> e-Visa is non-extendable, non-convertible &
                  not valid for visiting Protected/Restricted and Cantonment
                  Areas. If you ontend to visit Protected/Restricted/Cantonment
                  areas, you would require prior permission from the Civil
                  Authority.
                </div>
              </Grid>
            </Grid>
            <Divider style={{ marginTop: "8px" }} />
            <h4>
              **After you make payment, you will receive a secure link via email
              to upload documents**
            </h4>
            <Divider style={{ marginTop: "8px" }} />
          </CardContent>
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

export default Payment;
