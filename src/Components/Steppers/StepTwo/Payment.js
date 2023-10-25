import React, { useRef } from "react";
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
import Notification from "../../../utils/Notification";
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

function Payment({email}) {
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const tempId = location?.state?.tempId;

  let map = {
    "eTourist Visa(for 30 Days)": "99",
    "eTourist Visa(for 1 Year)": "149",
    "eTourist Visa(for 5 Years)": "249",
    "eBUSINESS VISA": "0.1",
    "eMEDICAL ATTENDANT VISA": "249",
    "eMEDICAL VISA": "249",
    "eCONFERENCE VISA": "249",
    "G20 eConference VISA": "249",
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
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const totalAmount =
        formvalues?.visaService === "eTOURIST VISA"
          ? map[formvalues?.visaOptions]
          : map[formvalues?.visaService];

      try {
        const { id, client_secret, billing_details } = paymentMethod;

        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + `/checkout`,
          {
            amount: totalAmount * 100,
            id: id,
            name: formvalues.firstName,
            sirName: formvalues.name,
            email: formvalues.email,
            tempId: tempId,
            visaOptions: formvalues.visaOptions,
            visaService: formvalues.visaService,
            street: "Shiv puri"||'NA',
            postal: '23454'||'NA',
            city: 'Haridwar'||'NA',
            state: 'CA'||'NA',
            country: 'US'||'NA',
            ip: formvalues.ip,
          }
        );
        console.log('response',response)
        if (response.data.success) {
          setSuccess(true);
          setLoading(false);
          console.log('response',billing_details);
          const responsess = await stripe.confirmCardPayment(
            response.data.paymentIntent.client_secret,
            {
              setup_future_usage: "off_session",
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: formData.cardName,
                  email: formvalues.email,
                  address: {
                    line1: "Shiv puri"||'NA',
                    line2:"klklklk",
                    postal_code: '23454'||'NA',
                    city: 'Haridwar'||'NA',
                    state: 'CA'||'NA',
                    country: 'US'||'NA',
                  },
                  phone:'7291969432'
                },
              },
            }
          );
          console.log("responsess", responsess);
          if (responsess.paymentIntent.status === "succeeded") {
            console.log("responsess", responsess);
            try {
              const finalResponse = await axios.post(
                process.env.REACT_APP_BASE_URL + `/payment`,
                {
                  amount: totalAmount * 100,
                  id: id,
                  name: formvalues.firstName,
                  sirName: formvalues.name,
                  email: formvalues.email,
                  tempId: tempId,
                  visaOptions: formvalues.visaOptions,
                  visaService: formvalues.visaService,
                  street: "Shiv puri"||'NA',
            postal: '23454'||'NA',
            city: 'Haridwar'||'NA',
            state: 'CA'||'NA',
            country: 'US'||'NA',
                  ip: formvalues.ip,
                  transactionId: response.data.paymentIntent.id,
                }
              );
              navigate(`/application-form/details/${tempId}`, {
                state: { tempId: tempId },
              });
            } catch (error) {
              setLoading(false);
              setError(true);
            }
          }
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };
  //navigate("/details", { state: { tempId: tempId } });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const paypal = useRef()
  useEffect(() => {
    const navdom = document.querySelector("#Step-payment");
    navdom.style.backgroundColor = "#1a75ff";
    navdom.style.color = "white";
    let response = []
    
    fetch();
    async function fetch() {
      try {
        response = await axios.get(
          process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
        );

        if (response.data.data?.length >= 1) {
          setFormValues(response.data.data[0]);
        } else {
        }
      } catch (error) {}
    }
    window.paypal?.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [ {
            description: "E-visa",
            amount: {
              currency_code:"USD",
              value:"0.1"
            }
          }]
        })
      },
      onApprove : async (data, actions) => {
        const order = await actions.order.capture()
        console.log( response.data.data[0])
        setLoading(true)
        const finalResponse = await axios.post(
          process.env.REACT_APP_BASE_URL + `/payment`,
          {
            tempId: tempId,
            transactionId: order?.purchase_units?.[0].payments.captures[0].id,
            email: response.data.data[0].email,
            name:response.data.data[0].firstName,
            sirName:response.data.data[0].name,
          })
          setLoading(false)
         navigate(`/application-form/details/${tempId}`, {
                state: { tempId: tempId },
              });
      },
      onError: (err) => {
        console.log(err)
      }
    }).render(paypal.current)
  },[])
  return (
  <>
     <div style={{marginTop:"5%", marginLeft:"20%"}} ref={paypal}></div>
     {loading && <Spinner></Spinner>}
     </>
   
  
  );
}

export default Payment;
