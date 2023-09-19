// src/components/Dashboard.js
import React from "react";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState("lg");
  const navigate = useNavigate();
  const { open } = props;
  console.log(props);

  const columns = [
    {
      name: "applicationNumber",
      label: "Application Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "firstName",
      label: "First/Given Names",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "DOB",
      label: "Date of Birth",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "country",
      label: "Country (Nationality)",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "PaymentStatus",
      label: "Payment Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "appStatus",
      label: "Application Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "visaService",
      label: "Visa Service",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "IPaddress",
      label: "IP Address",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Date/Time",
      label: "Date/Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "declaration",
      label: "Declaration",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const handleLinkClick = (event,id) => {
    // Prevent the default navigation behavior
    event.preventDefault();
    
    // Open a new tab
    const newTab = window.open(event.target.href, '_blank');
    
    // Post the data to the new tab\
    newTab.localStorage.setItem('id',id)
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/getLeads"
      );
      console.log(response);
      if (response.data.Status === "Success") {
        setData(response.data.result);
      }
    };
    fetch();
  }, []);

  const options = {
    filter: false,
    search: true,
    tableBodyHeight: "500px",

    // Fixed select column (if you have one)
    selectableRows: "none", // 'none' or 'single' or 'multiple'
    pagination: false,
    resizableColumns: false,
    overflow: true,
    showResponsive: true,
  };
  return (
    <Container style={{ padding: 0, margin: 0 }} maxWidth={open ? "md" : "lg"}>
      <MUIDataTable
        title={"Leads"}
        data={data.map((val) => {
          return [
            val.TempId,
            val.email,
            val.firstName,
            val.dob,
            val.country,
            val.paymentStatus ? (
              <Button variant="contained" size="small" color="success">
                Payment done
              </Button>
            ) : (
              <Button variant="contained" size="small" color="error">
                Payment pending
              </Button>
            ),
            "PENDING",
            "NA",
            "NA",
            "NA",
            <Link to="/customerDetail"  onClick={(e) => handleLinkClick(e,val.TempId)} >
              Form link
            </Link>,
            <Link to={"/"}>Download</Link>,
          ];
        })}
        columns={columns}
        options={options}
      />
    </Container>
  );
};

export default Dashboard;
