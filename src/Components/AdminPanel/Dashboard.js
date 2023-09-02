// src/components/Dashboard.js
import React from "react";
import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "firstName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TempId",
      label: "Temporary Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "citizenship",
      label: "Citizenship",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },  
    },
    {
        name: "portOfArrival",
        label: "Port Of Arrival",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "city",
        label: "City",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
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
        name: "visaOptions",
        label: "Visa Option",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "passportNumber",
        label: "Passport Number",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "qualification",
        label: "Qualification",
        options: {
          filter: true,
          sort: false,
        },  
      },
      {
        name: "religion",
        label: "Religion",
        options: {
          filter: true,
          sort: false,
        },  
      },
  ];

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
       "https://evisa-backend.vercel.app/getLeads"
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
    tableBodyHeight:"500px",
 // Fixed select column (if you have one)
  selectableRows: 'none', // 'none' or 'single' or 'multiple'
    pagination:false,
    resizableColumns: false,
    overflow:true,
    showResponsive: true
  };
  return (
    <Container style={{padding:0, margin:0}} maxWidth="md">
    
        <MUIDataTable
          title={"Leads"}
          data={data}
          columns={columns}
          options={options}       
 />
    </Container>
  );
};

export default Dashboard;
