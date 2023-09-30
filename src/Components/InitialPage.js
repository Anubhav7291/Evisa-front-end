import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import BI from "../assets/airport.jpg";
import cities from "../assets/cities.jpg";
import { useState } from "react";
import logo from "../assets/evisa.png";
import { COUNTRIES } from "../utils/Countries";
import { useNavigate } from "react-router-dom";

const styles = {
  header: {
    backgroundColor: "white",
    marginBottom:"15px"
  },
  background: {
    backgroundImage: `url(${BI})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // Keep the background fixed
    padding:"20px", // Set the height to the viewport height
    display: "flex",
    alignItems: "center",
    filter: "brightness(100%)",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    color: "black", // Changed text color to black
    textAlign: "center",
    fontWeight: "bold", // Added font weight
    fontFamily: 'Trebuchet MS'
  },
  button: {
    backgroundColor: "green",
    color: "white",
    marginTop: "20px",
  },
  footer: {
    backgroundColor: "black",
    padding: "20px",
    color: "white",
    textAlign: "center",
  },
};

const InitialPage = () => {
  const [country, setCountry] = useState("");
  console.log(country, country === "")
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }


  return (
    <div>
      <header style={styles.header}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Left side with logo */}
              <img src={logo} alt="Logo" height={"60px"} />
            </Grid>
            <Grid item xs={6}>
              {/* Right side with image */}
              <img src={cities} alt="Image" height={"60px"} />
            </Grid>
          </Grid>
        </Container>
      </header>

      {/* Background Image */}
      <div style={styles.background}>
        <Container maxWidth="md">
          <Card style={styles.card}>
            <CardContent>
              <div
                style={{ color: "#b83037",fontSize:"27px" }}
           
              >
                Prepare Your Visit
              </div>
              <br></br>
              <Divider style={{ background: "#b83037", }} variant="middle" />
              <br></br>
              <div style={{fontSize:"27px"}} paragraph>
                Visitors Traveling to India
              </div>
              <br></br><br></br>
              <div style={{fontSize:"27px"}}>
                (For Holidays, Tourism, Business and Transit purpose)
              </div>
              <br></br><br></br>
              <div style={{fontSize:"27px"}} paragraph>
                Select your country
              </div>
              <br></br><br></br>
              <TextField
                InputProps={{
                  style: {
                    height: "50px",
                    fontSize: "15px",
                    width: "400px",
                  },
                }}
                select
                label="Select Country"
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRIES.map((val) => {
                  return (
                    <MenuItem key={val.name} value={val.name}>
                      {val.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <br></br>
              <Button disabled={country === "" ? true : false} onClick={() => handleClick()} variant="contained" style={styles.button}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Footer */}
      <Paper style={styles.footer}>
        <span style={{ fontSize: "20px", fontWeight: "50px" }}>
          Privacy & Policy{" "}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style={{ fontSize: "20px", fontWeight: "50px" }}>
          Terms & Conditions
        </span>
        <br />
        <br />
        
        <p style={{color:"grey"}}>
        Legal Disclaimer:{" "}
        <a href="https://indiaevisaservices.org">
          https://indiaevisaservices.org
        </a>{" "}
        is an independently owned commercial website who offer assistance and
        advice to visitors in their upcoming journey. By using our website, you
        agree with our terms & conditions and our Privacy Policy
        </p>
        <br />
        <br />© 2023 IndiaeVisaServices.org, All Rights Reserved
      </Paper>
    </div>
  );
};

export default InitialPage;
